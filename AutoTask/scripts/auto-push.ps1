function log {
    param(
        [string] $type,
        [string] $msg
    )
    $msg = $msg -split "`r`n" -join " "
    Write-Host $type
    Write-Host $msg

    # 获取当前日期和时间
    $currentDate = Get-Date
    # 将日期对象转换为字符串，并指定格式
    $date = $currentDate.ToString("yyyyMMdd")
    $time = $currentDate.ToString("HHmmss")

    $UserRoot = "$env:USERPROFILE\Downloads"
    $logFilePath = "$UserRoot\$date-pwsh-$type.log"
    $errorMessage = "$time powershell script $type：$msg"
    Add-Content -Path $logFilePath -Value $errorMessage
}

function get_lnk_target($fullpath) {
    $sh = New-Object -ComObject WScript.Shell
    $target = $sh.CreateShortcut($fullpath).TargetPath
    return $target
}

function git_push($fullpath) {
    # 进入文件夹
    Set-Location $fullpath
    # 获取当前分支名
    $branch = git symbolic-ref --short HEAD
    # 获取上游名称
    $remote = git remote

    Write-Host "run command: git push $remote $branch. Current directory is $fullpath."  -ForegroundColor "green"
    # 开始更新
    $output = git push --quiet $remote $branch 2>&1
    if (-not $?) {
        log -type "warn" -msg $output
    }
    Write-Host "--------------------------------------------------over"
}

# 传入一个完整路径
function auto_push($folderPath) {
    # 使用 Get-ChildItem 命令获取文件夹中的子文件夹
    $subFolders = Get-ChildItem -Path $folderPath -Filter "*.lnk"

    # 遍历子文件夹
    foreach ($folder in $subFolders) {
        # 获取 lnk 文件的指向
        $target = get_lnk_target($folder.FullName)
        # 推送更新
        git_push($target)
    }
}


try {
    $OutputEncoding = [console]::InputEncoding = [console]::OutputEncoding = New-Object System.Text.UTF8Encoding
    # 编写的代码可能报错
    auto_push("D:\remote-repo")
} catch {
    $msg = $_
    Write-Host $msg -ForegroundColor "Red"
    # 输出报错信息到日志文件
    log -type "error" -msg $msg
}
