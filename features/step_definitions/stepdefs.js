const {Given, When, Then, AfterAll} = require('cucumber');
const {Builder, By, Capabilities, Key} = require('selenium-webdriver');
const {expect} = require('chai');

require("chromedriver");

// driver setup
const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', {"w3c": false});
const driver = new Builder()
    .withCapabilities(capabilities)
    .build();

Given('I am on the Google search page', {timeout: 60 * 1000}, async function () {
    await driver.get('https://www.google.com');
});

When('I search for {string}', {timeout: 60 * 1000}, async function (searchTerm) {
    const element = await driver.findElement(By.name('q'));
    element.sendKeys(searchTerm, Key.RETURN);
    element.submit();
});

Then('the page title should start with {string}', {timeout: 60 * 1000}, async function (searchTerm) {
    const title = await driver.getTitle();
    const isTitleStartWithCheese = title.toLowerCase().lastIndexOf(`${searchTerm}`, 0) == 0;
    expect(isTitleStartWithCheese).to.equal(true);
});

Given('I am on the Naver search page', {timeout: 60 * 1000}, async function () {
    await driver.get('https://www.naver.com');
});

When('I search for {string} on naver', {timeout: 60 * 1000}, async function (searchTerm) {
    const element = await driver.findElement(By.name('query'));
    element.sendKeys(searchTerm, Key.RETURN);
});

Then('the first website link should go to namu wiki', {timeout: 60 * 1000}, async function () {
    const site0 = await driver.findElement(By.xpath(`//*[@id="web_layer_0"]/dl/dt/a`));
    const site0Text = await site0.getText();
    const isTextEndsWithNamuWiki = site0Text.endsWith('나무위키');
    expect(isTextEndsWithNamuWiki).to.equal(true);
});

AfterAll('end', async function () {
    await driver.quit();
});