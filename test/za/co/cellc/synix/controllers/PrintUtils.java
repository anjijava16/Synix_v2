/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.controllers;

/**
 *
 * @author Pierre.Venter
 */
public class PrintUtils {

    public void printStatus(boolean passed) {
        String status;
        status = passed ? "*** Passed ***" : "!!!Failed!!!";
        System.out.println(status);
    }
}
