/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.controllers;

import java.util.ArrayList;
import java.util.List;
import za.co.cellc.synix.model.FormulaDefManager;
import za.co.cellc.synix.view.HtmlInputProcessor;

/**
 *
 * @author Pierre.Venter
 */
public class FormulaDefController {

    public List<FormuladefPojo> getFormulaDefPojos(HtmlInputProcessor htmlIp,boolean test) {
        FormulaDefManager fdm = new FormulaDefManager(htmlIp,test);
        return fdm.getFromulaDefPojos();
    }
}
