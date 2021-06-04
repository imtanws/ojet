define(['ojs/ojcore', 'knockout', 'ojs/ojknockout', 'ojs/ojbutton',
        'ojs/ojmodule'],
function(oj, ko)
{
  var viewModel = function(moduleParams)
  {
    // Set the content to be displayed
    this.content = moduleParams.data;

    // The function called when the "back" button is pressed
    this.goBack = function()
    {
      // Go back to previous router state
      window.history.back();
    }
  }

  return viewModel;
});
