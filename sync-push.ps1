# sync-push.ps1
$publish = "D:\PROGRAMING\Obsidian\Vault\Dung.s_Workspace\Publish"
$content = "D:\PROGRAMING\Obsidian\Quartz\content"
$repo    = "D:\PROGRAMING\Obsidian\Quartz"

robocopy $publish $content /MIR /NP /NDL /NJH /NJS
Set-Location $repo
git add .
git commit -m "Auto-sync from Publish at $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git push
