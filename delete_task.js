const { Builder, By, until } = require('selenium-webdriver');

async function deleteTask() {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://localhost:4200/login');
        await driver.findElement(By.id('username')).sendKeys('testuser');
        await driver.findElement(By.id('password')).sendKeys('password123');
        await driver.findElement(By.id('login-button')).click();

        await driver.wait(until.elementsLocated(By.css('.task-item')), 5000);

        // Supprimer la première tâche
        const deleteButtons = await driver.findElements(By.css('.delete-task-button'));
        if (deleteButtons.length > 0) {
            await deleteButtons[0].click();
            console.log("✅ Tâche supprimée");
        } else {
            console.log("⚠️ Aucune tâche à supprimer");
        }

    } finally {
        await driver.quit();
    }
}

deleteTask();
