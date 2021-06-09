define(['ojs/ojcore', 'knockout', 'jquery', 'hammerjs', 'ojs/ojknockout', 'ojs/ojjquery-hammer', 'promise', 'ojs/ojpulltorefresh', 'ojs/ojlistview', 'ojs/ojdatacollection-common', 'ojs/ojmodel'],
function(oj, ko, $, Hammer)
{
    function viewModel()
    {
        var self = this;

        var model = oj.Model.extend({
            idAttribute: 'source'
        });

        var collection = new oj.Collection(null, {
            url: 'http://localhost:8000/localData/tweets.json',
            model: model
        });

        self.dataSource = new oj.CollectionTableDataSource(collection, {idAttribute: 'source'});

        // viewModel ojModule convention method 
        self.handleTransitionCompleted = function(){
            var busyContext = oj.Context.getPageContext().getBusyContext();
            busyContext.whenReady(5000).then(function (){
                var root = document.getElementById('listview');
                oj.PullToRefreshUtils.setupPullToRefresh(root, function(){
                    var promise = new Promise(function(resolve, reject){
                        // var handler = function(event){
                        //     if (event && event.data){
                        //         // this timeout is just to simulate a delay so that
                        //         // the refresh panel does not close immediately
                        //         setTimeout(function() {
                        //             resolve();
                        //         }, 2000);
                        //     }
                        //     else{
                        //         reject();
                        //     }
                        //     self.dataSource.off("sync", handler);
                        //     self.dataSource.off("error", handler);
                        // };

                        // // listens for data fetched after refresh
                        // self.dataSource.on("sync", handler);
                        // self.dataSource.on("error", reject);
                        setTimeout(function() {
                            resolve()
                        }, 2000)
                    });

                    // calls reset to clear collection
                    // listview will fetch data from collection
                    collection.reset();
                    return promise;
                }, {'primaryText': 'Primary Text', 'secondaryText': 'secondary text'});
            });
        };

        // viewModel ojModule convention method 
        self.handleDeactivated = function(){
            var root = document.getElementById('listview');
            oj.PullToRefreshUtils.tearDownPullToRefresh(root);
        };
    }

    return viewModel;
});