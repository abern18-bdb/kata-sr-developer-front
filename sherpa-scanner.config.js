module.exports = {
  team: "TRANSVERSALES",
  branch: "QA",
  repository: "ANGULAR-TEMPLATE",
  framework: "ANGULAR",
  version: "3.8.2",
  crawlFrom: "./src",
  globs: ["**/!(*.test|*.spec).@(xhtml|html)?(x)"],
  url: "https://3mt8atlcre.execute-api.us-east-1.amazonaws.com/v1/v1/utilities/web-components/use-report",
  processors: [
    [
      "count-components",
      {
        outputTo: "./sherpa-report-angular.json",
      },
    ],
  ]
};
