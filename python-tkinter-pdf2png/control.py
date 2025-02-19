from tkinter import messagebox
from tkinter import filedialog
from pdf2image import convert_from_path
import os
from ui import Win
import threading


class Controller:
	class MyErr(Exception):
		pass
	# 导入UI类后，替换以下的 object 类型，将获得 IDE 属性提示功能
	ui: Win
	def __init__(self):
		pass
	def init(self, ui):
		"""
		得到UI实例，对组件进行初始化配置
		"""
		self.ui = ui
		self.listData = []
		self.ui.tk_input_dpi.insert('end', '300')
		self.ui.title('PDF文件转图片')
	# 定义异常处理装饰器
	def handle_exceptions(func):
		def wrapper(self, *args, **kwargs):
			try:
				return func(self, *args, **kwargs)
			except Controller.MyErr as e:
				messagebox.showwarning('警告', e)
			except Exception as e:
				messagebox.showerror('未知错误', e)
		return wrapper
	def get_output_path(self):
		output_path = filedialog.askdirectory(title="选择输出路径")
		if not output_path:
			raise self.MyErr('请选择文件存储路径')
		return output_path
	def get_dpi(self):
		dpi = self.ui.tk_input_dpi.get()
		if not str.isdigit(dpi):
			raise self.MyErr('dpi 必须为整数')
		dpi = int(dpi)
		if dpi < 10:
			raise self.MyErr('dpi至少大于 10')
		return dpi
	def get_list_data(self):
		data = self.listData
		if len(data) < 1:
			raise self.MyErr('请先选择要转换的PDF文件')
		return data

	def select(self,evt):

		pdf_files = filedialog.askopenfilenames(
			title="选择PDF文件",
			filetypes=[("PDF files", "*.pdf"), ("All files", "*.*")]
		)
		if pdf_files:

			self.ui.tk_list_box_show.delete(0, 'end')
			for pdf_file in pdf_files:
				# 获取文件名（包含扩展名）
				file_name = os.path.basename(pdf_file)
				self.listData.append(pdf_file)
				self.ui.tk_list_box_show.insert('end', file_name)
				print(pdf_file)

	@handle_exceptions
	def output(self,evt):
		dpi_value = self.get_dpi()
		listData = self.get_list_data()
		output_path = self.get_output_path()
		# 前往 https://github.com/oschwartz10612/poppler-windows/releases 下载
		poppler_path = r'C:\soft\zip\poppler-24.08.0\Library\bin'

		def task():
			self.ui.tk_progressbar_result['maximum'] = 100
			self.ui.tk_progressbar_result['value'] = 10
			self.ui.tk_progressbar_result.update()

			num_pdf_files = len(listData)
			for i, pdf_file in enumerate(listData):
				file_name = os.path.basename(pdf_file).split('.')[0]
				images = convert_from_path(pdf_file, poppler_path=poppler_path, dpi=dpi_value)
				# 获取该PDF文件转换后图片数量，用于确定序号的位数
				num_images = len(images)
				digit_count = len(str(num_images))
				for j, image in enumerate(images):
					# 格式化序号，用0补齐位数
					image_index = str(j + 1).zfill(digit_count)
					image_path = os.path.join(output_path, f"{file_name}_{image_index}.png")
					image.save(image_path, 'PNG')

					status = i/num_pdf_files * 90 + (1/num_pdf_files * 90 * (j+1)/num_images)
					self.ui.tk_progressbar_result['value'] = 10 + status
					print(i, num_pdf_files, j, num_images)
					self.ui.tk_progressbar_result.update()

			messagebox.showinfo('转换结果', '已成功转换！')
			self.ui.tk_progressbar_result.stop()
			self.ui.tk_button_m78rwahe.config(state='normal')
			self.ui.tk_button_m78ru6db.config(state='normal')

		threading.Thread(target=task).start()
		self.ui.tk_button_m78rwahe.config(state='disabled')
		self.ui.tk_button_m78ru6db.config(state='disabled')
