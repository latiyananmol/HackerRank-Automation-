const puppeteer=require("puppeteer");
const codeobj=require("./code");
const loginLink="https://www.hackerrank.com/auth/login";
const email="latiyananmol29@gmail.com";
const password="9312#######";
let browsereOpen=puppeteer.launch(
    {
        headless:false,args:["--start-maximized"]
        ,defaultViewport:null
    }
)
let page;
browsereOpen.then(
    function(browserobj){
        let browsereOpenPromise=browserobj.newPage();  // two tabs honge browser par 
        return browsereOpenPromise;
    }
).then(function(newTab){
    page=newTab;
    let hackerrankOpenPromise=newTab.goto(loginLink);
    return hackerrankOpenPromise;
}).then(
    function(){
        let emailEntered=page.type("input[id='input-1']",email,{delay:10});
        return emailEntered;
    }
).then(
    function(){
        let passwordEntered=page.type("input[type='password']",password,{delay:10});
        return passwordEntered;

    }
).then(
    function(){
        let clicked=page.click('button[data-analytics="LoginPassword"]',{delay:10}); //button[data-analytics="LoginPassword"]
        return clicked;
    }
).then(
    function(){
    let clickOnAlogPromise=waitAndClick('.topic-card a[data-attr1="algorithms"]',page); 
    return clickOnAlogPromise;  //a[data-attr1="algorithms"]
    }).then (function(){
        let getToWarmup=waitAndClick('input[value="warmup"]',page);
        return getToWarmup;

        }
    )
//     .then(
//         function(){
// let waitFor3Seconds=page.waitFor(3000);// this will wait for 3 seconds d
// return waitFor3Seconds;
//         }
//     )
.then(
    function(){    //$ is for querySelector and $$ is for querySelectorAll
        let allChallengePromise=page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled');
        return allChallengePromise;
    }
)
.then(
    function(questionArr){
        console.log("Number of Question ",questionArr.length);
        let questionWillBeSolved=questionSolver(page,questionArr[0],codeobj.answer[0]);
      
        return questionWillBeSolved;


    }
).catch(function(error){
    console.log("error Hai");
    console.log(error);
})


function waitAndClick(selector,currentPage){

    return new Promise(function(resolve,reject){
        let waitForModelPromise=currentPage.waitForSelector(selector);
        waitForModelPromise.then(
            function(){
                let clickModel=currentPage.click(selector);
                return clickModel;
            }).then(function(){resolve();}).catch(function(error){
                console.log("error aayi"+error);
            })
    }).then(function(error){
        console.log("some error");
        console.log(error);
    })

}


function questionSolver(page,question,answer){
    return new Promise(function(reject,resolve){
        let questionWillBeClicked=question.click();
        questionWillBeClicked.then(function(){
        // want to goto text area
        let textEditorfocus=waitAndClick('.monaco-editor.no-user-select.vs',page);
        return textEditorfocus;
        }).then(function(){
            return waitAndClick('input[type="checkbox"]',page);
        }).then(
            function(){
                return page.waitForSelector('textarea.custominput',page); // how page.waitForSelector()possible 
                
            }
        ).then(
            function(){
                return page.type('textarea.custominput',answer);
            }
        )
        // then(
        //     function(){
        //         return page.type('textarea.custominput',answer);
        //     }
        // )
        .then(
            function(){
                let ctrlIsPressed=page.keyboard.down('Control'); // niche hold kar k rakega 
                return ctrlIsPressed;
            }
        )
        .then(
            function(){
                let AisPressed=page.keyboard.press('A');
                return AisPressed;
            }
        )
        .then(
            function(){
                let XisPressed=page.keyboard.press('X');

            }
        )
        .then(
            function(){
                let ctrlisunpressed=page.keyboard.up('Control');
                return ctrlisunpressed;
            }
        )
        .then(
            function(){
                let mainEditorInFocus=waitAndClick('.monaco-editor.no-user-select.vs',page);
                return mainEditorInFocus;
            }
        )
        .then(
            function(){
                let ctrlIsPressed=page.keyboard.down('Control'); // niche hold kar k rakega 
                return ctrlIsPressed;
            }
        )
        .then(
            function(){
                let AisPressed=page.keyboard.press('A');
                return AisPressed;

            }
        ).then(
            function(){
                let VisPressed=page.keyboard.press('V');
                return VisPressed;
            }
        ).then(
            function(){
                let ctrlisunpressed=page.keyboard.up('Control');
                return ctrlisunpressed;
            }
        ).then(
            function(){
            waitAndClick('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled',page);
            })
            .then(
                function(){
                    resolve();
                }
            ).catch(
                function(err){
                    reject();
                                }
            )
    })

}
