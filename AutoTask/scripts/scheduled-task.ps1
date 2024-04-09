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
$action = New-ScheduledTaskAction -Execute "pwsh.exe" -Argument "-Command `"Start-Process -FilePath pwsh.exe -ArgumentList 'D:\github-code\AutoTask\scripts\auto-push.ps1'`""
# 每晚 10:20 分
$trigger = New-ScheduledTaskTrigger -Daily -At "22:20:00 PM"
# 需要有网络时才运行
$settings = New-ScheduledTaskSettingsSet -RunOnlyIfNetworkAvailable
$description = "这是一个定时推送本地 git 仓库的计划任务"
Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Description $description
