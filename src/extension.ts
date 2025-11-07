import * as vscode from 'vscode';
import * as os from 'os';
import { randomInt } from 'crypto';

/**
 * Формирует приветственное сообщение на русском языке в зависимости от времени суток
 * @returns {string} Приветственное сообщение с именем пользователя и эмодзи
 */
function get_message_ru(): string {
    let message: string = "";
    let user: string = os.userInfo().username;
    const now: Date = new Date();
    let hours: number = now.getHours();
    if (0 <= hours && hours < 6) {
        message = `Доброй ночи, ${user} (～￣▽￣)～`;
    } else if (6 <= hours && hours < 12) {
        message = `Доброго утра, ${user} (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧`;
    } else if (12 <= hours && hours < 18) {
        message = `Добрый день, ${user} ( ͡° ͜ʖ ͡°)`;
    } else if (18 <= hours && hours < 24) {
        message = `Добрый вечер, ${user} (´｡• ᵕ •｡\`)`;
    }
    message += " \
        Партия VSCode 🖥️🟦 строга: сдавать код можно только в пул реквесте 📄 и размером не более 10 MiB 📁🔟. \
        ✅ Кто соблюдает правила 📜➡️⚙️ — партия гордится тобой 🎖️🐲, выдать миску риса 🥡, выдать премиум-кофе ☕️🐼, доступ к valgrind открыт 🤖💎. Влад Сергей вами доволен. \
        ❌ Кто нарушает ❌ — партия отберет всё 🕳️🐉, минус социальный кредит 📉🐼💔, техдолг -5 баллов 🔻5️⃣. \
        🇨🇳🔥🇷🇺 УДАР КОДА! 💥⌨️🐲‼️ Вы открыли VSCode и готовы прогать. Партия и Влад Сергей гордятся вами.";
    return message;
};

/**
 * Формирует приветственное сообщение на английском языке в зависимости от времени суток
 * @returns {string} Приветственное сообщение с именем пользователя и эмодзи
 */
function get_message_en(): string {
    let message: string = "";
    let user: string = os.userInfo().username;
    const now: Date = new Date();
    let hours: number = now.getHours();
    if (0 <= hours && hours < 6) {
        message = `Good Night, ${user} (～￣▽￣)～`;
    } else if (6 <= hours && hours < 12) {
        message = `Good Morning, ${user} (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧`;
    } else if (12 <= hours && hours < 18) {
        message = `Good Day, ${user} ( ͡° ͜ʖ ͡°)`;
    } else if (18 <= hours && hours < 24) {
        message = `Good Evening, ${user} (´｡• ᵕ •｡\`)`;
    }
    return message;
};

/**
 * Определяет язык интерфейса VS Code и возвращает соответствующее приветственное сообщение
 * @returns {string} Приветственное сообщение на русском или английском языке
 */
function get_message(): string {
    const vscodeLanguage = vscode.env.language;
    if (vscodeLanguage.startsWith("ru")) {
        return get_message_ru();
    }
    return get_message_en();
}

/**
 * Возвращает мотивационное сообщение от Влада Сергея с правилами партии VSCode
 * @returns {string} Текст с правилами и мотивацией в формате HTML
 */
function vlados_message(): string {
    return"Партия VSCode 🖥️🟦 строга: сдавать код можно только в пул реквесте 📄 и размером не более 10 MiB 📁🔟.<br> \
        ✅ Кто соблюдает правила 📜➡️⚙️ — партия гордится тобой 🎖️🐲, выдать миску риса 🥡, выдать премиум-кофе ☕️🐼, доступ к valgrind открыт 🤖💎. Влад Сергей вами доволен. <br>  \
        ❌ Кто нарушает ❌ — партия отберет всё 🕳️🐉, минус социальный кредит 📉🐼💔, техдолг -5 баллов 🔻5️⃣. <br>  \
        🇨🇳🔥🇷🇺 УДАР КОДА! 💥⌨️🐲‼️ Вы открыли VSCode и готовы прогать. Партия и Хвост гордятся вами. <br> ";
}

/**
 * Создает и отображает панель с случайной GIF и приветственными сообщениями
 * @returns {void}
 */
function showGifPanel(): void {
    const panel = vscode.window.createWebviewPanel(
        'gifView',
        'Greeting',
        vscode.ViewColumn.One,
        { enableScripts: true }
    );

    /**
     * Массив URL-адресов GIF для случайного выбора
     * @type {string[]}
     */
    const gifs = [
        "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExczlhZTM0eDVxdWVpcTltMnM5MXo1MzNpdGs3aHg0a3NiMTJqbzF3dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Jkk64Xj64mcfu/giphy.gif",
        "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExem1rbnR4Mmc3ZTY2ZGYxZHAyZzVwdDVnYWI5bnAwZHNvcnA2ZGJvMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cEsoz6GAoTubm/giphy.gif"
    ];

    let gifUrl = gifs[randomInt(0, gifs.length)];
    
    /**
     * HTML-контент для отображения в панели
     * @type {string}
     */
    panel.webview.html = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    background-color: var(--vscode-editor-background);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    padding: 20px;
                    font-family: var(--vscode-font-family);
                }
                .container {
                    text-align: center;
                }
                img {
                    max-width: 100%;
                    max-height: 70vh;
                    border-radius: 10px;
                }
                .message {
                    color: var(--vscode-foreground);
                    margin-top: 20px;
                    font-size: 16px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <img src="${gifUrl}" alt="Funny GIF">
                <div class="message">${get_message()}</div>
                <div class="message">${vlados_message()}</div>
            </div>
        </body>
        </html>
    `;
}

/**
 * Активирует расширение при запуске VS Code
 * @param {vscode.ExtensionContext} context - Контекст расширения VS Code
 * @returns {Promise<void>}
 */
export async function activate(context: vscode.ExtensionContext): Promise<void> {
    /**
     * Показывает приветственное сообщение и GIF с небольшой задержкой после запуска
     */
    setTimeout(() => {
        const message = get_message();
        if (message) {
            vscode.window.showInformationMessage(message);
        }
        showGifPanel();
    }, 100);

    /**
     * Регистрирует команду для ручного вызова приветственного окна
     * @type {vscode.Disposable}
     */
    const disposable = vscode.commands.registerCommand('tadamcpp.helloWorld', () => {
        showGifPanel();
    });

    context.subscriptions.push(disposable);
}

/**
 * Деактивирует расширение при закрытии VS Code
 * @returns {void}
 */
export function deactivate(): void {}