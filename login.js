const { Builder, By, until } = require('selenium-webdriver');

async function login() {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://localhost:4200/login'); // URL de ton TP Fil Rouge

        // Saisir les identifiants valides
        await driver.findElement(By.id('username')).sendKeys('testuser');
        await driver.findElement(By.id('password')).sendKeys('password123');
        await driver.findElement(By.id('login-button')).click();

        // Vérifier redirection vers la page d'accueil
        await driver.wait(until.urlContains('/dashboard'), 5000);
        console.log('✅ Connexion réussie et redirection ok');

    } finally {
        await driver.quit();
    }
}

login();
