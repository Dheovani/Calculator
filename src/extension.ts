import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  const provider = new CalculatorViewProvider(context.extensionUri);

  vscode.window.registerWebviewViewProvider("calculator", provider, {
    webviewOptions: { retainContextWhenHidden: true }
  });
}

export function deactivate() {}

class CalculatorViewProvider implements vscode.WebviewViewProvider {
  constructor(private readonly extensionUri: vscode.Uri) {}

  resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, _token: vscode.CancellationToken) {
    webviewView.webview.options = {
      enableScripts: true
    };

    webviewView.webview.html = this.getHtml();
  }

  private getHtml(): string {
    const filePath = vscode.Uri.joinPath(this.extensionUri, 'src', 'templates', 'calculator.html');
    const htmlContent = fs.readFileSync(filePath.fsPath, 'utf-8');

    return htmlContent;
  }
}
