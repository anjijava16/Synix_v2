/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package za.co.cellc.synix.model;

import java.util.List;

/**
 *
 * @author Pierre.Venter
 */
public class GraphLabelObject {

    private String label;
    private String plotter;
    private String axis = "y1";
    private List<String> data;
    private float min;
    private float max;

    public GraphLabelObject(String label, String plotter, List<String> data) {
        this.label = label;
        this.plotter = plotter;
        this.data = data;
        createSeriesObject();
    }

    private void createSeriesObject() {
        setMax();
        setMin();
    }

    public void setAxis(String axis) {
        this.axis = axis;
    }

    public float getMin() {
        return min;
    }

    public float getMax() {
        return max;
    }

    public String getLabel() {
        return label;
    }

    public String getPlotter() {
        return plotter;
    }

    public String getAxis() {
        return axis;
    }

    private void setMin() {
        min = getFirstValue();
        for (int i = 1; i < data.size(); i++) {
            try {
                float testF = Float.valueOf(data.get(i));
                if (testF < min) {
                    min = testF;
                }
            } catch (Exception e) {
            }
        }
    }

    private void setMax() {
        max = getFirstValue();
        for (int i = 1; i < data.size(); i++) {
            try {
                float testF = Float.valueOf(data.get(i));
                if (testF > max) {
                    max = testF;
                }
            } catch (Exception e) {
            }
        }
    }

    private float getFirstValue() {
        float value = 0;
        for (int i = 0; i < data.size() - 1; i++) {
            try {
                value = Float.valueOf(data.get(i));
                return value;
            } catch (Exception e) {
            }
        }
        return value;
    }
}
