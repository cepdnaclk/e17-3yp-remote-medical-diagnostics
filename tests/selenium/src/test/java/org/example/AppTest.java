package org.example;

import static org.junit.Assert.assertTrue;

import org.junit.Assert;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

/**
 * Unit test for simple App.
 */
public class AppTest {
    /**
     * Rigorous Test :-)
     */
    @Test
    public void shouldAnswerWithTrue() {
        CharSequence email = "user@email.com";
        CharSequence password = "password";

        System.setProperty("webdriver.chrome.driver", "C:\\Users\\kavin\\Downloads\\Compressed\\chromedriver.exe");

        WebDriver driver = new ChromeDriver();

        driver.get("https://main.d16gxcp2w80zzy.amplifyapp.com");
        driver.findElement(By.id("floatingInput")).sendKeys(email);
        driver.findElement(By.id("floatingPassword")).sendKeys(password);
        driver.findElement(By.xpath("//*[@class=\"w-100 btn btn-lg btn-primary\"]")).click();

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        String displayedEmail = driver.findElement(By.xpath("//*[@id=\"dropdownUser2\"]/strong")).getText();

        Assert.assertEquals(email, displayedEmail);

    }
}
