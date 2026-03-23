document.getElementById('generateBtn').addEventListener('click', generateScript);
document.getElementById('copyBtn').addEventListener('click', copyToClipboard);
document.getElementById('downloadBtn').addEventListener('click', downloadScript);

function generateScript() {
    let script = '# Holmes Automator - Vanguard Engineering Payload\n';
    script += 'Write-Host "Initializing Vanguard Setup..." -ForegroundColor Cyan\n\n';

    // The Master Winget Registry
    const tools = [
        { id: 'vscode', name: 'VS Code', wingetId: 'Microsoft.VisualStudioCode' },
        { id: 'windowsTerminal', name: 'Terminal', wingetId: 'Microsoft.WindowsTerminal' },
        { id: 'git', name: 'Git', wingetId: 'Git.Git' },
        { id: 'python', name: 'Python 3.11', wingetId: 'Python.Python.3.11' },
        { id: 'msys2', name: 'MSYS2 (GCC)', wingetId: 'MSYS2.MSYS2' },
        { id: 'rust', name: 'Rust', wingetId: 'Rustlang.Rustup' },
        { id: 'go', name: 'Go', wingetId: 'Google.Go' },
        { id: 'julia', name: 'Julia', wingetId: 'Julia.Julia' },
        { id: 'openjdk', name: 'Java (OpenJDK)', wingetId: 'Microsoft.OpenJDK.21' },
        { id: 'dotnet', name: '.NET SDK', wingetId: 'Microsoft.DotNet.SDK.8' },
        { id: 'octave', name: 'GNU Octave', wingetId: 'GNU.Octave' },
        { id: 'nodejs', name: 'Node.js', wingetId: 'OpenJS.NodeJS' },
        { id: 'mongodb', name: 'MongoDB', wingetId: 'MongoDB.Server' }
    ];

    // Standard installations loop
    tools.forEach(tool => {
        if (document.getElementById(tool.id) && document.getElementById(tool.id).checked) {
            script += `Write-Host "Deploying ${tool.name}..." -ForegroundColor Yellow\n`;
            script += `winget install --id ${tool.wingetId} -e --accept-package-agreements --accept-source-agreements\n\n`;
        }
    });

    // --- NASA SPECIAL OPERATIONS ---
    
    // NASA GMAT
    if (document.getElementById('nasa_gmat') && document.getElementById('nasa_gmat').checked) {
        script += 'Write-Host "Fetching NASA GMAT R2025a from SourceForge..." -ForegroundColor Yellow\n';
        script += '$gmatUrl = "https://sourceforge.net/projects/gmat/files/GMAT/GMAT-R2025a/gmat-winInstaller-R2025a.exe/download"\n';
        script += 'Invoke-WebRequest -Uri $gmatUrl -OutFile "$env:TEMP\\gmat_setup.exe"\n';
        script += 'Write-Host "Launching GMAT Installer silently..." -ForegroundColor Cyan\n';
        script += 'Start-Process -FilePath "$env:TEMP\\gmat_setup.exe" -ArgumentList "/S" -Wait\n\n';
    }

    // NASA SPICE Toolkit
    if (document.getElementById('nasa_spice') && document.getElementById('nasa_spice').checked) {
        script += 'Write-Host "Provisioning NASA SPICE Toolkit (CSPICE)..." -ForegroundColor Yellow\n';
        script += 'New-Item -ItemType Directory -Force -Path "C:\\cspice"\n';
        script += '$spiceUrl = "https://naif.jpl.nasa.gov/pub/naif/toolkit/C/PC_Windows_VisualC_64bit/packages/cspice.zip"\n';
        script += 'Invoke-WebRequest -Uri $spiceUrl -OutFile "$env:TEMP\\cspice.zip"\n';
        script += 'Expand-Archive -Path "$env:TEMP\\cspice.zip" -DestinationPath "C:\\cspice" -Force\n';
        script += 'Write-Host "SPICE Toolkit extracted to C:\\cspice" -ForegroundColor Green\n\n';
    }

    // Poliastro
    if (document.getElementById('poliastro') && document.getElementById('poliastro').checked) {
        script += 'Write-Host "Installing Poliastro via PIP..." -ForegroundColor Yellow\n';
        script += 'pip install poliastro skyfield\n\n';
    }

    script += 'Write-Host "Vanguard Environment Fully Provisioned!" -ForegroundColor Green\n';

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

function downloadScript() {
    const codeText = document.getElementById('scriptOutput').innerText;
    const blob = new Blob([codeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'holmes_vanguard_setup.ps1';
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}