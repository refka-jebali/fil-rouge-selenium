const { Builder, By, until } = require('selenium-webdriver');

async function addTask() {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://localhost:4200/login');
        await driver.findElement(By.id('username')).sendKeys('testuser');
        await driver.findElement(By.id('password')).sendKeys('password123');
        await driver.findElement(By.id('login-button')).click();

        await driver.wait(until.elementLocated(By.id('new-task-input')), 5000);

        // Ajouter une tâche
        const taskDescription = "Acheter du lait";
        const input = await driver.findElement(By.id('new-task-input'));
        await input.sendKeys(taskDescription);
        await driver.findElement(By.id('add-task-button')).click();

        // Vérifier qu’elle apparaît dans la liste
        const tasks = await driver.findElements(By.css('.task-item'));
        let found = false;
        for (let t of tasks) {
            const text = await t.getText();
            if (text.includes(taskDescription)) found = true;
        }

        console.log(found ? "✅ Tâche ajoutée correctement" : "❌ Tâche non trouvée");

    } finally {
        await driver.quit();
    }
}

addTask();
