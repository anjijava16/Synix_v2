/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.controllers;

import java.util.ArrayList;
import java.util.List;
import za.co.cellc.synix.constants.Constants;
import za.co.cellc.synix.model.GraphConstructPojo;
import za.co.cellc.synix.model.GraphConstructsSingleton;
import za.co.cellc.synix.model.QueryManagerThread;

/**
 *
 * @author Pierre.Venter
 */
public class Orchestrator {

    private List<Thread> threads = new ArrayList<>();
    private boolean test;
    private List<FormulaDefPojo> formulaDefPojos;
    private List<GraphConstructPojo> graphConstructPojos;

    public List<GraphConstructPojo> getGraphConstructPojos(boolean test) throws Exception {
        this.test = test;
        setFormulaDefPojos();
        spawnQueryManagerThreads();
        waitForCompletion();
        setGraphConstructPojos();
        
        return graphConstructPojos;
    }

    private void setGraphConstructPojos() {
        graphConstructPojos = GraphConstructsSingleton.getInstance().getGraphDataPojos();
    }

    private void waitForCompletion() throws InterruptedException {
        while (!allThreadsDead(threads)) {
            Thread.sleep(2000);
        }
    }

    private void spawnQueryManagerThreads() throws Exception {
        for (FormulaDefPojo fdp : formulaDefPojos) {
            QueryManagerThread runnable = new QueryManagerThread(fdp, Constants.PlotterTypes.LINE.value(), test);
            threads.add(new Thread(runnable));
        }
        for (Thread t : threads) {
            t.start();
        }
    }

    private void setFormulaDefPojos() {
        FormulaDefController fdc = new FormulaDefController();
        formulaDefPojos = fdc.getFormulaDefPojos(test);
    }

    private boolean allThreadsDead(List<Thread> threads) {
        boolean dead = true;
        for (Thread t : threads) {
            if (t.isAlive()) {
                return false;
            }
        }
        return dead;
    }
}
