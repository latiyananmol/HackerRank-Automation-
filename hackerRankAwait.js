const puppeteer=require("puppeteer");
const codeobj=require("./code");
const loginLink="https://www.hackerrank.com/auth/login";
const email="latiyananmol29@gmail.com";
const password="9312009221";


 // iffi function yeh function yhi likha aour yha hi call kardea
(async function(){
try {
    console.log("1");
    let browserInstance= await puppeteer.launch({headless:false,args:["--start-maximized"]});
    let newTab=  await browserInstance.newPage();
    await newTab.goto(loginLink);
   // let newTab= await browserInstance.goto(loginLink);
    console.log("2");
    await newTab.type("input[id='input-1']",email);// type("input[id='input-1']",email,{delay:10})
    console.log("3");
    await newTab.type("input[type='password']",password);
    console.log("4");
    await newTab.click('button[data-analytics="LoginPassword"]',);
    console.log("5");
    await waitAndClick('.topic-card a[data-attr1="algorithms"]',newTab); 
    await waitAndClick('input[value="warmup"]',newTab);
    let allChallenges=await newTab.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled');
console.log("total",allChallenges.length);
await questionSolver(newTab,allChallenges[0],codeobj.answer[0]);

} catch (error) {
    console.log("error hai");
    console.log(error);
}
})()



//wait and click function 
 async function waitAndClick(selector,cpage){
    await cpage.waitForSelector(selector);
    let selectorClicked=cpage.click(selector);
    return selectorClicked;
 }
//  function waitAndClick(selector,currentPage){

//     return new Promise(function(resolve,reject){
//         let waitForModelPromise=currentPage.waitForSelector(selector);
//         waitForModelPromise.then(
//             function(){
//                 let clickModel=currentPage.click(selector);
//                 return clickModel;
//             }).then(function(){resolve();}).catch(function(error){
//                 console.log("error aayi"+error);
//             })
//     }).then(function(error){
//         console.log("some error");
//         console.log(error);
//     })

// }


async function questionSolver(page,question,answer){
    try{
     await question.click();
    await waitAndClick('.monaco-editor.no-user-select.vs',page);
    await  waitAndClick('input[type="checkbox"]',page);
    await page.waitForSelector('textarea.custominput',page);
    await page.type('textarea.custominput',answer);
   await  page.keyboard.down('Control');
   await page.keyboard.press('A');
   await page.keyboard.press('X');
   await page.keyboard.up('Control');
   await waitAndClick('.monaco-editor.no-user-select.vs',page);
   await  page.type('textarea.custominput',answer);
   await page.keyboard.down('Control');
   await page.keyboard.press('A'); 
   await page.keyboard.press('V');
   await page.keyboard.up('Control');
   await  waitAndClick('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled',page);


    }catch(error){
        console.log("here is error");
        console.log(error);
    }



    


}



// question Solver 
// function questionSolver(page,question,answer){
//     return new Promise(function(reject,resolve){
//         let questionWillBeClicked=question.click();
//         questionWillBeClicked.then(function(){
//         // want to goto text area
//         let textEditorfocus=waitAndClick('.monaco-editor.no-user-select.vs',page);
//         return textEditorfocus;
//         }).then(function(){
//             return waitAndClick('input[type="checkbox"]',page);
//         }).then(
//             function(){
//                 return page.waitForSelector('textarea.custominput',page); // how page.waitForSelector()possible 
                
//             }
//         ).then(
//             function(){
//                 return page.type('textarea.custominput',answer);
//             }
//         )
//         // then(
//         //     function(){
//         //         return page.type('textarea.custominput',answer);
//         //     }
//         // )
//         .then(
//             function(){
//                 let ctrlIsPressed=page.keyboard.down('Control'); // niche hold kar k rakega 
//                 return ctrlIsPressed;
//             }
//         )
//         .then(
//             function(){
//                 let AisPressed=page.keyboard.press('A');   // page.keyboard.press('A');
//                 return AisPressed;                          // page.keyboard.press('X');
//             }                                                 // page.keyboard.up('Control');
//         )                                                       
//         )                                                        
//         .then(                                                  
//             function(){
//                 let XisPressed=page.keyboard.press('X'); 

//             }
//         )
//         .then(
//             function(){
//                 let ctrlisunpressed=page.keyboard.up('Control');
//                 return ctrlisunpressed;
//             }
//         )
//         .then(
//             function(){
//                 let mainEditorInFocus=waitAndClick('.monaco-editor.no-user-select.vs',page);
//                 return mainEditorInFocus;
//             }
//         )
//         .then(
//             function(){
//                 let ctrlIsPressed=page.keyboard.down('Control'); // niche hold kar k rakega 
//                 return ctrlIsPressed;
//             }
//         )
//         .then(
//             function(){
//                 let AisPressed=page.keyboard.press('A');
//                 return AisPressed;

//             }
//         ).then(
//             function(){
//                 let VisPressed=page.keyboard.press('V');
//                 return VisPressed;
//             }
//         ).then(
//             function(){
//                 let ctrlisunpressed=page.keyboard.up('Control');
//                 return ctrlisunpressed;
//             }
//         ).then(
//             function(){
//             waitAndClick('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled',page);
//             })
//             .then(
//                 function(){
//                     resolve();
//                 }
//             ).catch(
//                 function(err){
//                     reject();
//                                 }
//             )
//     })

// }
