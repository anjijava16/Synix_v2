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
//import za.co.cellc.synix.controllers.graphconstruct.GraphConstructsSingleton;
import za.co.cellc.synix.controllers.graphconstruct.highchart.HighChartGraphConstructPojo;
import za.co.cellc.synix.model.QueryManagerThread;
import za.co.cellc.synix.view.HtmlInputProcessor;

/**
 *
 * @author Pierre.Venter
 */
public class Orchestrator {

    private List<Thread> threads = new ArrayList<>();
    private boolean test;
    private List<FormuladefPojo> formulaDefPojos;
    private int nrOfLiveThreads = 0;
    private int nrOfThreads = 0;
    private List<QueryManagerThread> qmThreads = new ArrayList<>();
    private List<GraphConstructPojo> graphConstPojos = new ArrayList<>();
    private List<List<HighChartGraphConstructPojo>> hCgraphConstPojos = new ArrayList<>();
    private HtmlInputProcessor htmlIp;

    public Orchestrator(HtmlInputProcessor htmlIp, boolean test) throws Exception {
        this.htmlIp = htmlIp;
        this.test = test;
        setFormulaDefPojos();
        spawnQueryManagerThreads();
        waitForCompletion();
        saveGraphContructsToGraphConstructsObject();
    }

    public List<GraphConstructPojo> getGraphConstructPojos(boolean test) throws Exception {
        return graphConstPojos;
    }

    public List<List<HighChartGraphConstructPojo>> getHcGraphConstructPojos(boolean test) throws Exception {
        return hCgraphConstPojos;
    }

    private void waitForCompletion() throws InterruptedException {
        while (!allThreadsDead(threads)) {
            Thread.sleep(2000);
        }
    }

    private void saveGraphContructsToGraphConstructsObject() {
        for (QueryManagerThread t : qmThreads) {
            List<GraphConstructPojo> gcp = t.getGraphConstPojos();
            List<List<HighChartGraphConstructPojo>> hgcp = t.gethCgraphConstPojos();
            for (GraphConstructPojo cp : gcp) {
                graphConstPojos.add(cp);
            }
            for (List<HighChartGraphConstructPojo> hcL : hgcp) {
                hCgraphConstPojos.add(hcL);
            }
        }
    }

    private void spawnQueryManagerThreads() throws Exception {
        for (FormuladefPojo fdp : formulaDefPojos) {
            QueryManagerThread runnable = new QueryManagerThread(htmlIp, fdp, Constants.PlotterTypes.LINE.value(), test);
            qmThreads.add(runnable);
            threads.add(new Thread(runnable));
        }
        for (Thread t : threads) {
            t.start();
        }
    }

    private void setFormulaDefPojos() throws Exception {
        FormulaDefController fdc = new FormulaDefController();
        formulaDefPojos = fdc.getFormulaDefPojos(htmlIp, test);
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
