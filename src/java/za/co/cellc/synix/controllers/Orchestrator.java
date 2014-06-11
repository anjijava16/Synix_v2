/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.controllers;

import java.util.ArrayList;
import java.util.List;
import za.co.cellc.synix.constants.Constants;
import za.co.cellc.synix.controllers.graphconstruct.GraphConstructPojo;
import za.co.cellc.synix.controllers.graphconstruct.GraphConstructsSingleton;
import za.co.cellc.synix.controllers.graphconstruct.highchart.HighChartGraphConstructPojo;
import za.co.cellc.synix.model.QueryManagerThread;
import za.co.cellc.synix.view.HtmlInputProcessor;

/**
 *
 * @author Pierre.Venter
 */
public class Orchestrator {

    private HtmlInputProcessor htmlIp = HtmlInputProcessor.getInstance();
    private List<Thread> threads = new ArrayList<>();
    private boolean test;
    private List<FormuladefPojo> formulaDefPojos;
    private int nrOfLiveThreads = 0;
    private int nrOfThreads = 0;

    public Orchestrator(boolean test) throws Exception {
        this.test = test;
        setFormulaDefPojos();
        spawnQueryManagerThreads();
        waitForCompletion();
    }

    public List<GraphConstructPojo> getGraphConstructPojos(boolean test) throws Exception {
        return GraphConstructsSingleton.getInstance().getGraphDataPojos();
    }

    public List<List<HighChartGraphConstructPojo>> getHcGraphConstructPojos(boolean test) throws Exception {
        return GraphConstructsSingleton.getInstance().getHCgraphConstPojos();
    }

    private void waitForCompletion() throws InterruptedException {
        while (!allThreadsDead(threads)) {
            Thread.sleep(2000);
        }
    }

    private void spawnQueryManagerThreads() throws Exception {
        for (FormuladefPojo fdp : formulaDefPojos) {
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
        int nrOfLiveThreads = 0;
        this.nrOfThreads = threads.size();
        boolean dead = true;

        for (Thread t : threads) {
            if (t.isAlive()) {
                nrOfLiveThreads++;
                dead = false;
            }
        }
        this.nrOfLiveThreads = nrOfLiveThreads;
        return dead;
    }

    public int getPercentageCompletion() {// as a percentage of the copmpleated threads (not live)
        int pc = 0;

        try {
            pc = 100 * ((nrOfThreads - nrOfLiveThreads) / nrOfThreads);
        } catch (Exception e) {
            pc = 0; //show zero progress if error with nr of threads
        }

        return pc;
    }

}
