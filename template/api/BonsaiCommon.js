// Define Bonsai operator types in documentation by checking for an explicit Category tag. If the class does not provide one,
// check the inheritance tree of the class. Ignore Bonsai.Combinator if Bonsai.Sink or Bonsai.Transform is present as many
// sink and transform operators inherit Bonsai.Combinator

exports.defineOperatorType = function defineOperatorType(model){
    let operatorType = {'source': false, 'combinator': false, 'sink': false, 'transform' : false};
    if (model.syntax && model.syntax.content[0].value){
      if (model.syntax.content[0].value.includes('[WorkflowElementCategory(ElementCategory.Source)]')){
        operatorType.source = true;
      }
      else if (model.syntax.content[0].value.includes('[WorkflowElementCategory(ElementCategory.Combinator)]')){
        operatorType.combinator = true;
      }
      else if (model.syntax.content[0].value.includes('[WorkflowElementCategory(ElementCategory.Sink)]')){
        operatorType.sink = true;
      }
      else if (model.syntax.content[0].value.includes('[WorkflowElementCategory(ElementCategory.Transform)]')){
        operatorType.transform = true;
      }
    }
    if (!(operatorType.source || operatorType.combinator || operatorType.sink || operatorType.transform)){
      if (model.inheritance){
        const inheritanceLength = model.inheritance.length;
        for (let i = 0; i < inheritanceLength; i++){
          if (model.inheritance[i].uid.includes('Bonsai.Source')){
            operatorType.source = true;
          }
          else if (model.inheritance[i].uid.includes('Bonsai.Combinator')){
            operatorType.combinator = true;
          }
          else if (model.inheritance[i].uid.includes('Bonsai.Sink')){
            operatorType.combinator = false;
            operatorType.sink = true;
          }
          else if (model.inheritance[i].uid.includes('Bonsai.Transform')){
            operatorType.combinator = false;
            operatorType.transform = true;
          }
          else if (model.inheritance[i].uid.includes('Bonsai.WindowCombinator')){
            operatorType.combinator = true;
          }
          else if (model.inheritance[i].uid.includes('Bonsai.IO.StreamSink')){
            operatorType.sink = true;
          }
          else if (model.inheritance[i].uid.includes('Bonsai.IO.FileSink')){
            operatorType.sink = true;
          }
          else if (model.inheritance[i].uid.includes('Bonsai.Dsp.ArrayTransform')){
            operatorType.transform = true;
          }
        }
      }
    }
    operatorType.showWorkflow = operatorType.source | operatorType.combinator | operatorType.sink | operatorType.transform;
    return operatorType;
  }

