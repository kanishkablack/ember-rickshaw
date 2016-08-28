import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  didInsertElement: function(){
    var data = this.get('data');
    var options = this.get('options');
    var graph = new Rickshaw.Graph( {
      element: this.element,
      width: this.get("width"),
      height: this.get("height"),
      renderer: this.get("type"),
      series: data
    });
    if(this.get("hover")){
      new Rickshaw.Graph.HoverDetail({
        graph: graph
      });
    }
    if(this.get("axistime")){
      new Rickshaw.Graph.Axis.Time({
        graph: graph
      });
    }
    if(this.get("slider")){
      new Rickshaw.Graph.RangeSlider.Preview({
        graph: graph,
        element: document.querySelector("#" + this.get("slider-element"))
      });
    }
    graph.render();
    this.set('graph', graph);
    this.addObserver('data.[]', this, this.updateGraph);
    this.addObserver('options', this, this.updateGraph);

  },
  updateGraph(graph_data){
    let graph = this.get("graph");
    graph_data.data.forEach(function(data,index){
      graph.series[index]=data;
    });
    graph.update();
  }


});
