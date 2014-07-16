/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.controllers;

import java.util.ArrayList;
import java.util.List;
import za.co.cellc.synix.constants.Constants;
import za.co.cellc.synix.model.FormulaDefManager;
import za.co.cellc.synix.view.HtmlInputProcessor;

/**
 *
 * @author Pierre.Venter
 */
public class FormulaDefController {

    private HtmlInputProcessor htmlIp;

    public List<FormuladefPojo> getFormulaDefPojos(HtmlInputProcessor htmlIp, boolean test) throws Exception {
        this.htmlIp = htmlIp;
        FormulaDefManager fdm = new FormulaDefManager(htmlIp, test);
        List<FormuladefPojo> fdps = fdm.getFromulaDefPojos();
        return filterFormulaDefPojos(fdps);
    }

    private List<FormuladefPojo> filterFormulaDefPojos(List<FormuladefPojo> fdps) throws Exception {
        List<FormuladefPojo> filtered = new ArrayList<>();
        for (FormuladefPojo fdp : fdps) {
            if (toProcessFormulaDef(fdp)) {
                filtered.add(fdp);
            } else {
                System.out.println("Ignoring formulaDef: " + fdp.toString());
            }
        }
        return filtered;
    }

    private boolean toProcessFormulaDef(FormuladefPojo fdp) throws Exception {
        String period = htmlIp.getPeriod();
        String level = htmlIp.getLevel();
        String view = getView(fdp, period, level);
        return view != null && view.length() > 0;
    }

    private String getView(FormuladefPojo formulaDefPojo, String period, String level) throws Exception {

        String view = "";
        switch (period) {
            case Constants.HOURLY:
                switch (level) {
                    case Constants.CELL:
                        view = formulaDefPojo.getViewCellHourly();
                        break;
                    case Constants.CONTROLLER:
                        view = formulaDefPojo.getViewControllerHourly();
                        break;
                    default:
                        System.out.println("Invalid level " + level);
                        throw new Exception("Invalid level " + level);
                }
                break;
            case Constants.DAILY:
                switch (level) {
                    case Constants.CELL:
                        view = formulaDefPojo.getViewCellDaily();
                        break;
                    case Constants.CONTROLLER:
                        view = formulaDefPojo.getViewControllerDaily();
                        break;
                    default:
                        System.out.println("Invalid level " + level);
                        throw new Exception("Invalid level " + level);
                }
                break;
            case Constants.WEEKLY:
                switch (level) {
                    case Constants.CELL:
                        view = formulaDefPojo.getViewCellWeekly();
                        break;
                    case Constants.CONTROLLER:
                        view = formulaDefPojo.getViewControllerWeekly();
                        break;
                    default:
                        System.out.println("Invalid level " + level);
                        throw new Exception("Invalid level " + level);
                }
                break;
            case Constants.MONTHLY:
                switch (level) {
                    case Constants.CELL:
                        view = formulaDefPojo.getViewCellMonthly();
                        break;
                    case Constants.CONTROLLER:
                        view = formulaDefPojo.getViewControllerMonthly();
                        break;
                    default:
                        System.out.println("Invalid level " + level);
                        throw new Exception("Invalid level " + level);
                }
                break;
            default:
                System.out.println("Invalid period " + period);
                throw new Exception("Invalid period " + period);
        }
        if (view == null || view.equalsIgnoreCase("null") || view.isEmpty()) {
            return null;
        }
        return view;
    }

}
