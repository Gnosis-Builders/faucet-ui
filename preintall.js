console.log(process.env);
if (process.env.npm_execpath.indexOf("yarn") === -1) {
    
    console.log("==================================");
    console.log("Please use yarn. Thank you.");
    console.log("==================================");
}
process.exit(1);
