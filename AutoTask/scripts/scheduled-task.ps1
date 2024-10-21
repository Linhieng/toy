<#

该脚本作用：
    将脚本 D:\.scripts\auto-push.ps1 创建为一个自动任务，每天晚上 10:20 分 自动运行。
使用方法：
    首先准备好 D:\.scripts\auto-push.ps1 脚本，具体请见该脚本。然后直接运行该脚本即可，运行方式是直接双击，也就是使用 pwsh7 运行该脚本。

#>

$taskName = "MyTask"

# 检查任务是否存在
$taskExists = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue

# 如果任务存在，则删除它
if ($taskExists) {
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
} else {
    Write-Host "任务 $taskName 不存在，不需要删除。"
}

# 如果需要隐藏窗口，可以直接在 Start-Process 后添加 -WindowStyle hidden
$action = New-ScheduledTaskAction -Execute "pwsh.exe" -Argument "-Command `"Start-Process -FilePath pwsh.exe -ArgumentList 'D:\.scripts\auto-push.ps1'`""
# 每晚 10:20 分
$trigger = New-ScheduledTaskTrigger -Daily -At "22:20:00 PM"
# 需要有网络时才运行
$settings = New-ScheduledTaskSettingsSet -RunOnlyIfNetworkAvailable
$description = "这是一个定时推送本地 git 仓库的计划任务"
Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Description $description
