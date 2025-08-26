const { Builder, By, until } = require('selenium-webdriver');

async function listTasks() {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://localhost:4200/login');
        await driver.findElement(By.id('username')).sendKeys('testuser');
        await driver.findElement(By.id('password')).sendKeys('password123');
        await driver.findElement(By.id('login-button')).click();

        await driver.wait(until.elementsLocated(By.css('.task-item')), 5000);

        const tasks = await driver.findElements(By.css('.task-item'));
        console.log("Liste des tâches :");
        for (let t of tasks) {
            const text = await t.getText();
            console.log("- " + text);
        }

    } finally {
        await driver.quit();
    }
}

listTasks();
