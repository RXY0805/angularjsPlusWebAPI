using System.Web;
using System.Web.Optimization;

namespace FIFA14
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));
            bundles.Add(new ScriptBundle("~/bundles/angular")

                .Include("~/Scripts/ng-file-upload-shim.min.js",
                "~/Scripts/angular.js",
                "~/Scripts/ng-file-upload.min.js", 
                "~/Scripts/angular-ui/ui-bootstrap-tpls.min.js",
                "~/Scripts/angular-ui-router.min.js"));
           
              //  "~/Scripts/angular-route.js"

            bundles.Add(new ScriptBundle("~/bundles/appjs")
               .Include("~/app/app.js",
                        "~/app/views/nation/nationCtrl.js",
                         "~/app/views/match/matchCtrl.js",
                        "~/app/views/group/groupCtrl.js",
                         "~/app/views/utility/uploadCtrl.js",
                         "~/app/views/utility/yesnoCtrl.js",
                            "~/app/views/utility/noticeCtrl.js",
                        "~/app/factories/groupFactory.js",
                         "~/app/factories/matchFactory.js",
                         "~/app/factories/nationFactory.js"
                        ));
            //,"~/app/views/helper/uploadCtrl.js"
                         
              //"~/app/Controllers/fifa14.js",
            //bundles.Add(new StyleBundle("~/bundles/vendor").Include(
            //         "~/Scripts/angular.js",
            //         "~/Scripts/angular-route.js"));
            //bundles.Add(new StyleBundle("~/bundles/applicationjs").Include(
            //        "~/app/app.js"));
        }
    }
}
