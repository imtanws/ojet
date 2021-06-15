define(['ojs/ojcore', 'knockout', 'jquery', 'dataService', 'ojs/ojknockout', 'promise', 'ojs/ojtable', 'ojs/ojarraydataprovider'],
function(oj, ko, $, data){   
    function viewModel(params){
        var self = this;
        self.num = ko.observable('0')
        self.submit = function() {
            data.sendLoan({money: self.num()}).then(function(res) {
                if (res.code == 1) {
                    alert('贷款成功')
                    params.toggle()
                } else{
                    alert('贷款失败')
                }
            })
        }
    }
    return viewModel
}); 
