document.getElementById('generateBtn').addEventListener('click', generateScript);
document.getElementById('copyBtn').addEventListener('click', copyToClipboard);

function generateScript() {
    let script = '# Holmes Automator - Advanced Windows Payload\\n';
    script += 'Write-Host "Initializing Setup..." -ForegroundColor Cyan\\n\\n';

    // Tool logic map
    const tools = [
        { id: 'vscode', name: 'Visual Studio Code', wingetId: 'Microsoft.VisualStudioCode' },
        { id: 'windowsTerminal', name: 'Windows Terminal', wingetId: 'Microsoft.WindowsTerminal' },
        { id: 'python', name: 'Python 3.11', wingetId: 'Python.Python.3.11' },
        { id: 'msys2', name: 'MSYS2 (C/C++ Compiler Base)', wingetId: 'MSYS2.MSYS2' },
        { id: 'git', name: 'Git', wingetId: 'Git.Git' },
        { id: 'cmake', name: 'CMake', wingetId: 'Kitware.CMake' }
    ];

    tools.forEach(tool => {
        if (document.getElementById(tool.id) && document.getElementById(tool.id).checked) {
            script += `Write-Host "Installing ${tool.name}..." -ForegroundColor Yellow\\n`;
            script += `winget install --id ${tool.wingetId} -e --accept-package-agreements --accept-source-agreements\\n\\n`;
        }
    });

    // Handle VS Code Extensions separately
    if (document.getElementById('vscodeExtensions') && document.getElementById('vscodeExtensions').checked) {
        script += 'Write-Host "Installing VS Code Extensions for C/C++..." -ForegroundColor Yellow\\n';
        script += 'code --install-extension ms-vscode.cpptools --force\\n';
        script += 'code --install-extension ms-vscode.cpptools-extension-pack --force\\n\\n';
    }

    script += 'Write-Host "Environment Configuration Complete!" -ForegroundColor Green\\n';

    // Display the panel and the code
    document.getElementById('outputPanel').style.display = 'block';
    document.getElementById('scriptOutput').innerText = script;
}

function copyToClipboard() {
    const codeText = document.getElementById('scriptOutput').innerText;
    navigator.clipboard.writeText(codeText).then(() => {
        const copyBtn = document.getElementById('copyBtn');
        const originalText = copyBtn.innerText;
        copyBtn.innerText = 'Copied!';
        copyBtn.style.color = '#3fb950';
        copyBtn.style.borderColor = '#3fb950';
        
        setTimeout(() => {
            copyBtn.innerText = originalText;
            copyBtn.style.color = 'var(--accent)';
            copyBtn.style.borderColor = 'var(--border)';
        }, 2000);
    });
}