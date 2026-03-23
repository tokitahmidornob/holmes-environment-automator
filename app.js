document.getElementById('generateBtn').addEventListener('click', generateScript);
document.getElementById('copyBtn').addEventListener('click', copyToClipboard);

function generateScript() {
    let script = '# Holmes Automator - Universal Engineering Payload\n';
    script += 'Write-Host "Initializing Universal Setup..." -ForegroundColor Cyan\n\n';

    // The Master Language Registry
    const tools = [
        // Core
        { id: 'vscode', name: 'VS Code', wingetId: 'Microsoft.VisualStudioCode' },
        { id: 'windowsTerminal', name: 'Terminal', wingetId: 'Microsoft.WindowsTerminal' },
        { id: 'git', name: 'Git', wingetId: 'Git.Git' },
        // Systems
        { id: 'python', name: 'Python 3.11', wingetId: 'Python.Python.3.11' },
        { id: 'msys2', name: 'MSYS2 (GCC)', wingetId: 'MSYS2.MSYS2' },
        { id: 'rust', name: 'Rust', wingetId: 'Rustlang.Rustup' },
        { id: 'go', name: 'Go', wingetId: 'Google.Go' },
        { id: 'zig', name: 'Zig', wingetId: 'zig.zig' },
        // Scientific & Enterprise
        { id: 'julia', name: 'Julia', wingetId: 'Julia.Julia' },
        { id: 'openjdk', name: 'Java (OpenJDK)', wingetId: 'Microsoft.OpenJDK.21' },
        { id: 'dotnet', name: '.NET SDK', wingetId: 'Microsoft.DotNet.SDK.8' },
        { id: 'rproject', name: 'R Project', wingetId: 'RProject.R' },
        // Web & Backend
        { id: 'nodejs', name: 'Node.js', wingetId: 'OpenJS.NodeJS' },
        { id: 'mongodb', name: 'MongoDB', wingetId: 'MongoDB.Server' },
        { id: 'php', name: 'PHP', wingetId: 'PHP.PHP' },
        { id: 'ruby', name: 'Ruby', wingetId: 'RubyInstallerTeam.RubyWithDevKit' }
    ];

    tools.forEach(tool => {
        if (document.getElementById(tool.id) && document.getElementById(tool.id).checked) {
            script += `Write-Host "Deploying ${tool.name}..." -ForegroundColor Yellow\n`;
            script += `winget install --id ${tool.wingetId} -e --accept-package-agreements --accept-source-agreements\n\n`;
        }
    });

    script += 'Write-Host "Universal Environment Fully Provisioned!" -ForegroundColor Green\n';

    document.getElementById('outputPanel').style.display = 'block';
    document.getElementById('scriptOutput').innerText = script;
}

function copyToClipboard() {
    const codeText = document.getElementById('scriptOutput').innerText;
    navigator.clipboard.writeText(codeText).then(() => {
        const copyBtn = document.getElementById('copyBtn');
        const originalText = copyBtn.innerText;
        copyBtn.innerText = 'Copied!';
        setTimeout(() => { copyBtn.innerText = originalText; }, 2000);
    });
}