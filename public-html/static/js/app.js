var gUserInfo;
var gAppRouter;
var gAppInfo = { 
		title: 'Depot Repair',
		appTitle: 'Internal Portal',
		appTitleShort: 'Int Portal',
		description: "Depot Repair Portal for Internal Customers",
		eaiNumber: 4800,
		eaiName: 'CSVS-TCDR: Depot Repair',
		servicesBaseUri: '/csvstcdr/tcws',
		owner: {
			itFedExId: 173662,
			itMgrName: 'Griz Risley',
			bsFedExId: 35298,
			bsMgrName: 'Lisa Murphy'
		},
		version: {
			major: 0,
			minor: 0,
			revision: 1,
			build: 1
		}
};
var gAppHelper = {
		setAppBreadCrumb: function (txt) {
			$('#appBreadCrumbs').empty();
			$('#appBreadCrumbs').html('<a href="#">Service Offerings</a> / ' + txt);
		}
};
function NVL(v) {
	return ( typeof v !== "undefined" && v ) ? v : "";
}
function gAppLogout() { 
   $.ajaxSetup({ headers: { 'OBLIX_UID': null, 'Content-Type': 'application/json' } });
   window.location.assign("index.html");
   return false;
}