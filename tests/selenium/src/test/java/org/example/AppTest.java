package org.example;

import static org.junit.Assert.assertTrue;

import org.junit.Assert;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.List;

import seleniumConsulting.ch.selenium.framework.driver.WebDriverManager;

/**
 * Unit test for simple App.
 */
public class AppTest {
    /**
     * Rigorous Test :-)
     */
    @Test
    public void shouldAnswerWithTrue() {
        io.github.bonigarcia.wdm.WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // ---Doctor---
        driver.get("https://medgenie.tk");

        // login
        CharSequence doctorEmail = "sheldonC@medgenie.tk";
        CharSequence doctorPassword = "wsPxAygwN5A5h8S";

        driver.findElement(By.id("login-button-navbar")).click();

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        driver.findElement(By.xpath("//*[@id=\"login_\"]/p/a")).click();

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        driver.findElement(By.id("floatingInput")).sendKeys(doctorEmail);
        driver.findElement(By.id("floatingPassword")).sendKeys(doctorPassword);

        // log in button
        driver.findElement(By.xpath("//*[@id=\"login_\"]/form/fieldset/button")).click();

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        String doctor = driver.findElement(By.xpath("//*[@id=\"dropdownUser2\"]")).getText();
        System.out.println("Doc" + doctor);
        // create session
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/form/label[1]/input"))
                .sendKeys((CharSequence) "2022-02-01");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/form/label[2]/input"))
                .sendKeys((CharSequence) "19:00");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/form/button")).click();

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        driver.switchTo().alert().dismiss();

        driver.findElement(By.xpath("//*[@id=\"dropdownUser2\"]")).click();
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/div/div/ul/li[4]/a")).click();

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // ---Patient---
        driver.get("https://medgenie.tk/");

        // login
        CharSequence patientEmail = "kavindu@gmail.com";
        CharSequence patientPassword = "asdfzxcv";

        driver.findElement(By.id("login-button-navbar")).click();

        driver.findElement(By.id("floatingInput")).sendKeys(patientEmail);
        driver.findElement(By.id("floatingPassword")).sendKeys(patientPassword);

        driver.findElement(By.xpath("//*[@id=\"login_\"]/form/fieldset/button")).click();

        try {
            Thread.sleep(4000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // username
        String displayedEmail = driver.findElement(By.xpath("//*[@id=\"dropdownUser2\"]/strong")).getText();

        // device config message
        driver.findElement(By.id("later")).click();

        // go to doctors
        driver.get("https://medgenie.tk/doctors");

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        boolean isSessionCreated = false;

        WebElement table = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div/div[2]/div/table/tbody"));

        List<WebElement> allRows = table.findElements(By.tagName("tr"));

        for (WebElement row : allRows) {
            List<WebElement> cells = row.findElements(By.tagName("td"));
            if (cells.get(1).getText().equals(doctor)) {
                isSessionCreated = true;
            }
        }

        Assert.assertEquals("Kavindu Jayasooriya", displayedEmail);
        Assert.assertEquals(true, isSessionCreated);

    }
}
