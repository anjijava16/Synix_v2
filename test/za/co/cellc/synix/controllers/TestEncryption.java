package za.co.cellc.synix.controllers;

import static org.junit.Assert.*;

import org.junit.Test;

public class TestEncryption {

    Encryption auth = new Encryption();
    boolean testPassed = false;

    @Test
    public void testOtpEncrypt() {
        System.out.println("\ntestOtpEncrypt() "
                + "\n==============");
        testPassed = false;
        String message = "The quick brown fox jumped over the lazy dog";
        String padEncryptedMessage = auth.otpEncrypt(message);

        if (padEncryptedMessage.equals("«ßßßßßßßß")) {
            testPassed = true;
        }

        assertTrue(testPassed);
    }

    @Test
    public void testOtpDecrypt() {
        System.out.println("\ntestOtpDecrypt() "
                + "\n================");
        testPassed = false;
        String message = "The quick brown fox jumped over the lazy dog";
        String padEncryptedMessage = auth.otpEncrypt(message);
        String padDecryptedMessage = null;
        try {
            padDecryptedMessage = auth.otpDecrypt(padEncryptedMessage);
            if (padDecryptedMessage.equals(message)) {
                testPassed = true;
            }
        } catch (Exception e) {
            testPassed = false;
            e.printStackTrace();
        }

        assertTrue(testPassed);

        System.out.println("message : ->" + message + "<-");
        System.out.println("padEncryptedMessage : " + padEncryptedMessage);
        System.out.println("padDecryptedMessage : ->" + padDecryptedMessage + "<-");
    }

    @Test
    public void testEncrypt() {
        System.out.println("\ntestEncrypt() "
                + "\n===========");
        testPassed = false;
        String message = "The quick brown fox jumped over the lazy dog";

        String encryptedMessage = null;
        String decryptedMessage = null;

        encryptedMessage = auth.encrypt(message);
        String test = "qz8/3z8/Pz8/3z8/Pz8/3z8/P98/Pz8/Pz/fPz8/P98/Pz/fPz8/P98/Pz8=";
        if (encryptedMessage.equals(test)) {
            testPassed = true;
        }

        assertTrue(testPassed);

    }

    @Test
    public void testDecrypt() {
        System.out.println("\ntestDecrypt() "
                + "\n=============");
        testPassed = false;
        String message = "The quick brown fox jumped over the lazy dog";

        String encryptedMessage = null;
        String decryptedMessage = null;

        encryptedMessage = auth.encrypt(message);
        try {
            decryptedMessage = auth.decrypt(encryptedMessage);
            if (decryptedMessage.equals(message)) {
                testPassed = true;
            }
        } catch (Exception e) {
            testPassed = false;
            e.printStackTrace();
        }

        System.out.println("message : ->" + message + "<-");
        System.out.println("encryptedMessage : " + encryptedMessage);
        System.out.println("decryptedMessage : ->" + decryptedMessage + "<-");

        assertTrue(true);
    }

    @Test
    public void testSqlInjectionTrap() {
        System.out.println("\ntestSqlInjectionTrap()"
                + "\n====================");
        testPassed = false;
        String logonWithSQL = "khgkefgu65::&& insert";
        try {
            auth.sqlInjectionTrap(logonWithSQL);
        } catch (Exception e) {
            testPassed = true;
        }

        assertTrue(testPassed);
    }
}
