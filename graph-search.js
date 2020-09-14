

// https://www.youtube.com/watch?v=cWNEl4HE2OE&list=PLBDuVpwoLMoJxKDT5W2-sptUxwhmlTdZ0&index=13&t=0s

/* THIS IS A FIRESHIP TUTORIAL ON GRAPH SEARCH I MAY IMPLEMENT ON OTHER PROJECTS  */ 
const airports  = 'PHX BKK OKC JFK LAX MEX EZE HEL LOS LAP LIM'.split(' '); 
/*
const routes = [ //THE ORIGINAL LIST FROM TUTORIAL THAT  <<<< DOES NOT >>> MATCH THE ROUTE MAP 
    ['PHX', 'LAX'],
    ['PHX', 'JFK'],
    ['JFK', 'OKC'],
    ['JFK', 'HEL'],    
    ['JFK', 'LOS'],
    ['MEX', 'LAX'],
    ['MEX', 'BKK'],
    ['MEX', 'LIM'],
    ['MEX', 'EZE'],
    ['LIM', 'BKK']
];
*/

const routes = [ // FULL CONNECTED ROUTES MATCH THE ROUTE MAP 
                ['PHX', 'LAX'],
                ['PHX', 'JFK'],
                ['JFK', 'OKC'],
                ['JFK', 'LOS'],
                ['JFK', 'HEL'],    
                ['JFK', 'EZE'],             
                ['MEX', 'LAX'],
                ['MEX', 'BKK'],
                ['MEX', 'LIM'],
                ['MEX', 'EZE'],
                ['LIM', 'BKK'],
                ['LAX', 'JFK']

            ];

/*
const routes = [ 
                    ['PHX', 'LAX'],
                    ['PHX', 'JFK'],
                    ['JFK', 'OKC'],
                    ['LIM', 'HEL'],
                    ['JFK', 'LOS'],
                    ['LOS', 'LAP'],
                    ['MEX', 'LAP'],
                    ['MEX', 'LAX'],
                    ['MEX', 'BKK'],
                    ['MEX', 'LIM'],
                    ['MEX', 'EZE'],
                    ['LIM', 'BKK'],
                ];
*/
/////////////////////////////////////////////////////////////////
// BUILD AN ADJACENCY LIST
/////////////////////////////////////////////////////////////////

// OUR GRAPH:
//--> Map() =BEHAIVES LIKE DICTIONARY, OR HASHMAP, HAS API FEATURES
const adjancencyList = new Map();


// ADD NODE: 
//--> ADD NODES TO MAP / GRAPH
function addNode(airport){
    adjancencyList.set(airport, []);
}

// ADD EDGE, UNDIRECTED:// grabing key and values 
function addEdge(origin, destination){
    adjancencyList.get(origin).push(destination);
    adjancencyList.get(destination).push(origin);
}
/////////////////////////////////////////////////////////////////
// CREATE THE GRAPH
// --> loop through aiprots build map create node for each airport then
//--> loop through route grab origin the key  and push into node set the destination or value 
airports.forEach(addNode);
routes.forEach(route => addEdge(...route) )

console.log(adjancencyList);



/////////////////////////////////////////////////////////////////
// BREADTH FIRST SEARCH
/////////////////////////////////////////////////////////////////
/* OUR FINAL MAP LOOKS LIKE THIS 
Map {
    'PHX' => [ 'LAX', 'JFK' ],
    'BKK' => [ 'MEX', 'LIM' ],
    'OKC' => [ 'JFK' ],
    'JFK' => [ 'PHX', 'OKC', 'HEL', 'LOS' ],
    'LAX' => [ 'PHX', 'MEX' ],
    'MEX' => [ 'LAX', 'BKK', 'LIM', 'EZE' ],
    'EZE' => [ 'MEX' ],
    'HEL' => [ 'JFK' ],
    'LOS' => [ 'JFK' ],
    'LAP' => [],
    'LIM' => [ 'MEX', 'BKK' ]
  }
// modified 
  Map {
  'PHX' => [ 'LAX', 'JFK' ],
  'BKK' => [ 'MEX', 'LIM' ],
  'OKC' => [ 'JFK' ],
  'JFK' => [ 'PHX', 'OKC', 'LOS' ],
  'LAX' => [ 'PHX', 'MEX' ],
  'MEX' => [ 'LAP', 'LAX', 'BKK', 'LIM', 'EZE' ],
  'EZE' => [ 'MEX' ],
  'HEL' => [ 'LIM' ],
  'LOS' => [ 'JFK', 'LAP' ],
  'LAP' => [ 'LOS', 'MEX' ],
  'LIM' => [ 'HEL', 'MEX', 'BKK' ]
}
FINAL pathArray from checkforTarget2() [ 'HEL', 'LIM',  'MEX', 'LAP',  'LOS', 'JFK',   'PHX'
]

                                 visited = Set { 'LIM', 'MEX', 'BKK', 'LAP', 'LAX', 'EZE', 'LOS', 'PHX' }
 */ 
  

// FIND A ROUTE FROM PHONIEX TO BANGKOCK
//THIS WORKS IN MY FIND A ROUTE METHOD bfsall()
/*
// let startingPt = 'PHX';
// let finalDestination = 'BKK';

let startingPt = 'MEX';
let finalDestination = 'OKC';
MY RESULT [ 'MEX', 'LAX', 'PHX', 'JFK', 'OKC' ]

let startingPt = 'HEL';
let finalDestination = 'PHX';
// let startingPt = 'OKC';
// let finalDestination ='EZE' ;

let startingPt = 'LIM';
let finalDestination ='EZE' ;
MY RESULT [ 'LIM', 'MEX', 'EZE' ]

let startingPt = 'LIM';
let finalDestination ='LOS' ;
MY RESULT [ 'LIM', 'MEX', 'LAX', 'PHX', 'JFK', 'LOS' ] //ONLY FASTER ROUTE IS DELETE PHX FROM THIS LIST
let startingPt = 'LIM';
let finalDestination ='HEL' ;
*/
// MY RESULT [ 'BKK', 'MEX', 'LAX', 'PHX', 'JFK', 'OKC' ]


function bfs(start){
    const queue = [start]
    const visited = new Set();
    let complete = false;
    let optimalRoute = [];


    while ( queue.length > 0 && complete == false ){
        const airport = queue.shift();
        const destinations = adjancencyList.get(airport);
        // console.log("get airport", destinations)
        
        for ( const destination of destinations ){
            console.log("current node", airport)
            console.log("all nodes destinations", destinations)
            queue.push(destination);
            // let currNode = destination;
            // optimalRoute.push(currNode) ;
            
            if (!visited.has(destination) && destination != startingPt ){
                visited.add(destination);
                queue.push(destination);
                //  if ( airport not in visited push destination)
                 if ( !visited.has(airport) ){ optimalRoute.push(destination);}

          
                // optimalRoute.push(destination) ;
                // if ( currNode !=destination ){ optimalRoute.push(destination) ; }
                // if ( !queue.includes(destination))
                // console.log("nodes = destinations", destination)
                console.log("visited =", visited);
                console.log("optimal route", optimalRoute);
                console.log("queue =", queue);
            } 

            if( destination === finalDestination ){
                console.log('found it!');
                complete = true;
                console.log("visited =", visited);
                console.log("optimal route", optimalRoute);
                console.log("nodes =", destination);
                console.log("queue =", queue);
            }
        }    
    }
}
// bfs(startingPt);

/* 
THE WAY TO IMPROVE BELOW IS TO SAVE THE FIRST SUCCESSFUL ROUTE TO A LARGER ARRAY
THEN TO TRY AGAIN EACH TIME CHECKING THE NEW CHOICE MADE AGAINST THE PRIOR SUCCESSFUL ROUTE CHOICE AT THE SAME STEP 
CHOOSING AN ALTERNATE  OPTION IF ONE EXISTS IF NOT CHOOSE SAME OPTION ALSO WHEN AT A NODE FIND THAT CURR NODE IN PRIOR LIST AND 
TRY TO CHOOSE A DESTINATION DIFF THAN THE CURR NODE ONE DIFF THAN THE NEXT ONE LISTED IN THE ARRAY 
RUN IT 5-10 TIMES AND AND THEN SORT BY LENGTH TO FIND THE QUICKEST ROUTE WITH LEAST NODES

?? WHAT IF NO ROUTE IS FOUND ? 
?? WHAT ABOUT BACKING UP AND TRYING ANOTHER FORK FROM LAST FAIL POINT>?>>

ORIGINAL NOTES BELOW:
    
    check all connecting nodes :
    get departing node : check if its destinations are the target if not grab first destination 
    then check if that is a departing node 
    if so grab each of its destinations and 
    check if none are the target then check each to see if they 
    are a departing node 

*/

function bfsAll(start)
{
    let complete = false;
    let optimalRoute1 = [];
    optimalRoute1.push(start)
    let exitCount = 0;
    let pathArray = [];
    let comboArray = []
    let startingNodes = adjancencyList.get(startingPt);
    console.log("before while loop these are the starting nodes", startingNodes);
   
 while( complete == false || !pathArray.includes(finalDestination) )
  {
    for ( node of startingNodes)
    {
        console.log(" ^  AT TOP LOOP" );
        pathArray = [];
        allDeptartingNodes = [];
       if ( !pathArray.includes(startingPt)){ pathArray.push(startingPt);}

        function checkforTarget2( checkArrayForTarget )/// is target in this array 
        {
            if (   checkArrayForTarget.includes(finalDestination)) 
                {
                    console.log( 'checkArrayForTarget2 looking for final D in this', checkArrayForTarget);
                    pathArray.push(finalDestination);
                    complete = true;
                    console.log();
                    console.log('<<<<<<<<<<<< COMPLETE RESULT >>>>>>>>>>>>>>>>>>')
                    console.log('A ROUTE WASS FOUND !! from checkforTarget2()', pathArray);
                    console.log('<<<<<<<<<<<< COMPLETE RESULT >>>>>>>>>>>>>>>>>>')
                    console.log();

                    return true;
                }
            else{
                console.log("target not found at Check Target 2 in:", checkArrayForTarget)
                return false;
            }  
        }

       function checkForDepartingNodes( departingNodeArray )
            {
                let targetfound = false;
                if (complete == true) return
                if( departingNodeArray.length == 0) return
                let checkDestinations = departingNodeArray;

                console.log("Curr Checking these Destinations in CheckforDeparting Nodes", checkDestinations)
                // console.log("get airport", destinations)
                // CHECK EACH DESTINATION TO SEE IF DEPARTING NODE
                for ( destination of checkDestinations )
                {
                if( targetfound === true ) {break;}
                if(targetfound === false)
                {
                    console.log('curr destination being assessed', destination );
                    // if( !pathArray.includes(node)){pathArray.push(node)}; // push in the first node obj we are searching then everything else
                    // if ( !allDeptartingNodes.includes(destination) )//we dont want to search departing nodes more than once
                    // if ( !allDeptartingNodes.includes(destination) && destination !=startingPt )//we dont want to search departing nodes more than once
                    if ( !pathArray.includes(destination) )//we dont want to search departing nodes more than once
                    {
                        //ATTEMPT TO GRAB ALL DESTINATIONS FROM POSSIBLE DEPARTING NODE ?
                        let departingNode = adjancencyList.get(destination);
                        allDeptartingNodes.push(destination);

                        //CHECK EACH DEPARTING NODES CHECK IT DESTINATIONS
                        if (departingNode.length>0)
                        {
                            pathArray.push(destination);
                            console.log("the destinations for  ",destination,"    are :", departingNode);
                            console.log("the building patharray is", pathArray);
                            targetfound = checkforTarget2(departingNode);// check if we found target 
                            console.log("TargetFound ==", targetfound);
                            if( targetfound == true ) {break;}
                            if( targetfound == false )
                                {
                                let checkAgain = departingNode; //copy current array
                                console.log("target not found now feeding this data backi into  checkForDepartingNodes( checkAgain );", checkAgain );
                                checkForDepartingNodes( checkAgain ); // feed array back in without current item, so we can search new items
                                }
                        }
                    } 
                    if ( pathArray.includes(destination) ) {
                        let checkAgain = checkDestinations; //copy current array
                        checkAgain.splice(checkDestinations.indexOf(destination),1); //remove the item we are currently assessing 
                        checkForDepartingNodes( checkAgain ); 
                    } 
                 }
               }
            }
      
        ////!!!!!~~~ GET RID OF THIS FUNCTION AND GET RIGHT INTO THE   checkForDepartingNode AND OR RENAME IT ROUTE BUILDER 
        function checkforTarget( checkArrayForTarget )/// is target in this array 
            {
                if (complete == true) return
                if (   checkArrayForTarget.includes(finalDestination)  ) 
                    {
                        // comboArray.push(finalDestination);
                        pathArray.push(finalDestination);
                        complete = true;
                        console.log('"this is the final route at CheckforTarget()"', pathArray);
                        return complete
                    }
                else checkForDepartingNodes(checkArrayForTarget)
            }
                                   
        let destinationsArray = adjancencyList.get(node);//RETURNS ARRAY OF DESTINATIONS FROM THIS DEPARTING AIRPORT
        if ( !pathArray.includes(node)){ pathArray.push(node);}

        console.log( 'destinationsArray bottom of for loop ', destinationsArray );
        if (destinationsArray.length>0 ){
            // push in the first node obj we are searching then everything else
            checkforTarget(destinationsArray);// start loop check
        if (complete == true ) break;
        }
            
        if (complete == true ) break;
        console.log("AT BOTTOM OF FOR LOOP");
        /// THIS BREAKS LOOP ON ERRORS RETURNING EMPTY OR SMALL ARRAYS TOO MANY TIMES 
        if ( destinationsArray.length < 2 ){ exitCount +=1};
        if ( exitCount> 3 ){complete = true;}
    }// END FOR LOOP 
 }// END WHILE LOOP
}// END FUNCTION 
// let startingPt = 'LIM';
// let finalDestination ='EZE' ;
// bfsAll(startingPt);

/*
    let complete = false;
    let exitCount = 0;
    let pathsArray = [];
    let targetfound = false;
    let stepCt = 0 ;
    let masterArray=[];

function buildPath( departingNodeArray )
    {           
            if ( !pathsArray.includes(startingPt)){ pathsArray.push(startingPt);}
            let destinationsArray =[];
            destinationsArray = adjancencyList.get(departingNodeArray);//RETURNS ARRAY OF DESTINATIONS FROM THIS DEPARTING AIRPORT
            console.log(" curr path array----}}}}}>", pathsArray);
            console.log("this is curr destinationsArray", destinationsArray);
                
            if (  Array.isArray(destinationsArray))
            {
                for ( let destination of destinationsArray)
                {
                    if (   destinationsArray.includes(finalDestination)) 
                    {
                        pathsArray.push(finalDestination);
                        console.log('<<<<<<<<<<<< COMPLETE RESULT >>>>>>>>>>>>>>>>>>')
                        console.log('A ROUTE WASS FOUND !!', pathsArray);
                        targetfound = true;
                        break;
                    }   
                    if( targetfound === false)
                    {
                    console.log('destination being assessed <<<<<', destination, '>>>>>>>>');
                    if ( !pathsArray.includes(destination) && !pathsArray.includes(finalDestination) )//we dont want to search departing nodes more than once
                        {
                        pathsArray.push(destination);
                        buildPath(destination)
                        }
                    } 
                }
        } else { console.log('this is not an array exiting func'); return }
        // if ( destinationsArray.length < 2 ){ exitCount +=1}; /// THIS BREAKS LOOP ON ERRORS RETURNING EMPTY OR SMALL ARRAYS TOO MANY TIMES 
        // if ( exitCount> 3 ){complete = true; console.log("Something went wrong exiting function") }
    }// END funct

 let startingPt = 'LOS';
let finalDestination ='LIM' ;
 console.log(`find route between`, startingPt, 'and', finalDestination);
buildPath( startingPt)
*/

/*
let complete = false;
let exitCount = 0;
let pathsArray = [];
let targetfound = false;
let stepCt = 0 ;
let masterArray=[];
let roundsCt =0;
let newDestinationFound = false;
let counter = 1;
let newLocation = '';
let incr = 1;
function buildPath2( departingNode )
{           
        if ( !pathsArray.includes(startingPt)){ pathsArray.push(startingPt);}
        let  destinationsArray =[];
        destinationsArray = adjancencyList.get(departingNode);//RETURNS ARRAY OF DESTINATIONS FROM THIS DEPARTING AIRPORT
                                console.log(" curr path array----}}}}}>", pathsArray);
                                console.log("this is curr destinationsArray", destinationsArray);
                                // console.log("Is destinations array an Array???", Array.isArray(destinationsArray) );
            
        if (  Array.isArray(destinationsArray) )
        {
            // HERE WE WANT TO CHOOSE A DIFF DESTINATION THAN PREVIOUS ROUTE ARRAY DID 
            for ( let destination = 0;  destination <= destinationsArray.length; destination++ )
            {
                let location =  destinationsArray[destination];    
                if (   destinationsArray.includes(finalDestination)   ) 
                {
                    pathsArray.push(finalDestination);
                    console.log('<<<<<<<<<<<< COMPLETE RESULT >>>>>>A ROUTE WASS FOUND !!', pathsArray);
                    targetfound = true;
                    stepCt +=1;
                    counter = 1;
                    roundsCt=0;
                    incr =1;
                    masterArray.push(pathsArray);
                    pathsArray = [];
                    break;
                }   
            if ( targetfound === false)
                {
                if ( stepCt > 0  )
                    {
                  
                        console.log('masterArray[stepCt]', masterArray[(stepCt-1)] );
                        console.log('destination #',destination );
                        console.log('location',location );
                        // console.log(' masterArray[(stepCt-1)][(destination)]', masterArray[(stepCt-1)][destination]);
                        // console.log(' masterArray[(stepCt-1)][roundsCt]', masterArray[(stepCt-1)][roundsCt]);
                        // console.log(' masterArray[(stepCt-1)][roundsCt+1]', masterArray[(stepCt-1)][(roundsCt+1)]);
                        // console.log(' masterArray[(stepCt-1)][(destination+1)]', masterArray[(stepCt-1)][(destination+1)]);

                        /////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //     console.log('locations is:<<<', location,'>>>> master array match is :<<<<', (masterArray[(stepCt-1)][ (roundsCt+1) ]).toString() ,">>>>");
                    //   if ( location == ( masterArray[ (stepCt-1) ][ (roundsCt+1) ]).toString() )// &&  destination < destinationsArray.length-1) 
                    //   if ( stepCt>=2){incr=2;}
                      
                        // LOOK THROUGH ALL PRIOR ARRAYS SEARCHING FOR CURRENT DESTINATION
                        //     >GET INDEX POS OF CURR IN EACH ARRAY THEN CHECK THE NEXT INDEX POS STORE THOSE IN AN ARRAY
                        //         + arraylookingat.indexOf('the thing we looking for')  ,   
                        //         loc = masterArray.indexOf('departingNode') /// the curr departing node find it in master array 
                        //         if (loc){  try  avoidthesedestination.push(  masterArray[?][(loc+1)]  );
                        //     >THEN LOOK THROUGH CURR CHOICES OF NEXT MOVE AND CHOOSE A DIFF ONE

                        // THEN LOOK AT THE NEXT CHOICES MADE 
                        // THEN ATTEMPT TO CHOOSE A DIFF CHOICE IF AVAILABLE ELIGIBLE 


                     
                      console.log('locations is:<<<', location,'>>>> master array match is :<<<<', (masterArray[(stepCt-incr)][ (roundsCt+1) ]).toString() ,">>>>");
                      if ( location == ( masterArray[ (stepCt-incr) ][ (roundsCt+1) ]).toString() )// &&  destination < destinationsArray.length-1) 
                            { 
                            // console.log( 'newDestinationFound',  newDestinationFound,   '|| location < departingNodeArray.length',  location, departingNodeArray.length )
                            while ( newDestinationFound == false && counter < destinationsArray.length  ) 
                                {
                                    console.log("+++ INSIDE +++ while loop looking for other destinations ");
                                try{
                                    console.log('{}{} IN TRY CATCH {}{}');
                                    let indexNew =0;
                                    newLocation = '';
                                    indexNew = destination + counter;
                                    console.log('destination is ', destination, 'counter is', counter);
                                    // console.log('indexNew = destination + counter;',indexNew = destination + counter);

                                    console.log( "&&&& --- indexNew --- &&&& ", indexNew );
                                    console.log( "THE DESTIONATION ARRAY IS", destinationsArray);
                                    console.log( '@@@@  destinationsArray[indexNew] @@@@@, ', destinationsArray[indexNew] );
                                    newLocation = destinationsArray[indexNew] ;// try to assign the next element in the array
                                  
                                    console.log("<><>LOCATION CHANGED TO<><><>", newLocation);
                                        // if ( newLocation != undefined) 
                                        //   {
                                            let checkNumDest =[];
                                            checkNumDest = adjancencyList.get(newLocation);//get destinations for new element, if it has more than one destination meaning it is not a deadend then keep going with it
                                            console.log('%+% The new Check Destinations is', checkNumDest);
                                            if (checkNumDest.length==1) // if only has on destination its a dead end , dont use it
                                                {
                                                console.log('the new choice', newLocation, 'node only has one destination', checkNumDest,'revert back to prior pick'); 
                                                counter+=1  
                                                }
                                            if (checkNumDest.length>1)
                                                {
                                                newDestinationFound = true;
                                                // location =  destinationsArray[destination]; 
                                                }
                                        //   }
                                        //   if ( newlocation == undefined) {location =  destinationsArray[destination]; }
                                    }
                                catch(ex) {console.log('THere was error trying to pick from prior array', ex); newDestinationFound = true;  counter = 1;}  
                                console.log('***AT END OF WHILE LOOP AND newDestinationFound is: ', newDestinationFound);
                                location = newLocation;
                            }
                    roundsCt +=1;
                    }    
                // find index of curr location in master array
                // find next 
                }
            

                console.log('destination being assessed <<<<<',location, '>>>>>>>>');
                if ( !pathsArray.includes(location) && !pathsArray.includes(finalDestination) )//we dont want to search departing nodes more than once
                    {
                        pathsArray.push(location);
                        newDestinationFound =false;
                        buildPath2(location);
                      
                    }
                } 
            } 
        }
            else { console.log('this is not an array exiting func'); return }
    // if ( destinationsArray.length < 2 ){ exitCount +=1}; /// THIS BREAKS LOOP ON ERRORS RETURNING EMPTY OR SMALL ARRAYS TOO MANY TIMES 
    // if ( exitCount> 3 ){complete = true; console.log("Something went wrong exiting function") }
}// END funct

let startingPt = 'LOS';
let finalDestination ='LIM' ;
while (stepCt < 5)
{   
    console.log(`find route between`, startingPt, 'and', finalDestination);
         targetfound = false;
         newDestinationFound =false;
         console.log("Calling Build Path From OUtside Func")
         buildPath2( startingPt );
         console.log('Master Array', masterArray);
     }

*/



let complete = false;
let exitCount = 0;
let pathsArray = [];
let targetfound = false;
let stepCt = 0 ;
let masterArray=[];
let roundsCt =0;
let newDestinationFound = false;
let counter = 1;
let newLocation = '';
let incr = 1;
let pathArray = [];
let location = '';
let state = 0;
let maxSteps = 9;
let failedList = [];
let  lastGoodNode = "";
let currBadNode ='';

    /*
        LOOK THROUGH ALL PRIOR ARRAYS SEARCHING FOR CURRENT DESTINATION
            >GET INDEX POS OF CURR IN EACH ARRAY THEN CHECK THE NEXT INDEX POS STORE THOSE IN AN ARRAY
                + arraylookingat.indexOf('the thing we looking for')  ,   
                loc = masterArray.indexOf('departingNode') /// the curr departing node find it in master array 
                if (loc){  try  avoidthesedestination.push(  masterArray[?][(loc+1)]  );
            >THEN LOOK THROUGH CURR CHOICES OF NEXT MOVE AND CHOOSE A DIFF ONE

        THEN LOOK AT THE NEXT CHOICES MADE 
        THEN ATTEMPT TO CHOOSE A DIFF CHOICE IF AVAILABLE ELIGIBLE 

        # New Feature >A.) Store array of failed routes with 3 data pts, looks like, [node prior, node prior, failed route ]
                            -ensure we are not currentlty coming from an pursuing this 3 step tree 
                      B.)  We dont want to discout a node as next possible choice if its been already used once but has more options, 
                            - do we want to store and check and remove each destination we choose per node 
                      C.) on check target we are elimiting possible route even if longer if hit a multi dest node that includes target but may 
                            - have another node that will also connect to the target 
                     D.)  rewrite keep it to 250 lines or less, write it with states, add variables : nodePrior, nodeCurr, nodeNext
                         > in addtion to failed routes, create ineligible nodes list, for nodes leading to just one other node or deadends
                         > allow visit to prior nodes to attempt all other paths
                         > trigger when patharrays are identical either we are done or we need a direction shift 
                     E.) I think we need to exhaust each node before attempting new routes - so HEL -> JFK (attempt every possible route ) need to ensure we don't duplicate the route directions      

    */
function buildPath3( departingNode )
{           
        if ( !pathsArray.includes(startingPt)){ pathsArray.push(startingPt);}
        let  destinationsArray =[];
        destinationsArray = adjancencyList.get(departingNode);//RETURNS ARRAY OF DESTINATIONS FROM THIS DEPARTING AIRPORT
                                console.log(" C U R R   P A T H   A R R A Y ->", pathsArray);
                                console.log("<> this is curr destinationsArray", destinationsArray);
                                // console.log("Is destinations array an Array???", Array.isArray(destinationsArray) );
    lastGoodNode = "";
    currBadNode ='';
    
    console.log(" -!-F-!-  Failed ROUTES List =", failedList);
    if (  Array.isArray(destinationsArray) )
        {
            // HERE WE WANT TO CHOOSE A DIFF DESTINATION THAN PREVIOUS ROUTE ARRAY DID 
           for ( let destination = 0;  destination <= destinationsArray.length; destination++ )
           {
                location =  destinationsArray[destination];    
                if (   destinationsArray.includes(finalDestination)   ) 
                {
               
                    //////////////////////////
                    //////////---> REWRITE A PROPER ARRAY COMPARE > WHERE FIRST CHECK IF CURR ARRAY IS SAME LENGTH AS ANY OTHER, > THEN IF ANY OF THE COMPONENTS WITHIN DONT MATCH MOVE TO NEXT 
                    // if ( masterArray[ (stepCt - 1) ] == pathsArray    ){ ///!!!<><><!> NEED FOR LOOP TO CHECK 2 ARRAYS SAME LENGTH EACH ELEMENT TO SEE IF IDENTICAL
                    //     console.log('  ^-M-^  master array matches curr patharray, master= ,',  masterArray[ (stepCt - 1) ], 'patharray', pathsArray   )
                    //         // CHECK FOR ALERNATE NODE IN CURRENT DEST ARRAY
                    //         // if any of destinations that are not target and are not already in our list
                    //     }
                     
                    // targetfound = false; 
                    //  } else {
                    //////////////////////////
                    ////---> HERE DOUBLE CHECK THERE IS NOT ANOTHER NODE IN THIS ARRAY THAT CAN BE PART OF THE PATH
                    /// LIKE FOR ANY NODES IN THIS ARRAY THAT ARE NOT FINAL DESTINATION DO ANY OF THEM HAVE TARGET AS A DESTINATION IF SO PUSH IT THEN TARGET AND EXIT
                    if ( stepCt > 6){
                    for ( nodes of destinationsArray  )
                        {  
                            console.log('this is node', nodes);
                           let check = [];

                            if( nodes != finalDestination)
                                { 
                                check = adjancencyList.get( nodes );
                                console.log('for node check', nodes , 'these are the destinations', check);
                                }
                           
                            if ( typeof check != 'undefined' && check.length>0 )
                                {
                                if ( check.includes(finalDestination)  )
                                        {
                                        console.log('pushing node into our path array', nodes); 
                                        pathsArray.push(nodes);
                                        break;
                                        }
                                }
                        }}
                    
                   /* !! - with above I get below 
                   [ 'HEL', 'JFK', 'LAX', 'PHX', 'Failed Route' ],
                *  [ 'HEL', 'JFK', 'EZE', 'MEX', 'LIM', 'BKK' ],
                    the rest dupes 

                   !! -without above I get 
                   Master Array [
                  * [ 'HEL', 'JFK', 'PHX', 'LAX', 'MEX', 'BKK' ],
                    [ 'HEL', 'JFK', 'LAX', 'PHX', 'Failed Route' ],
                  * [ 'HEL', 'JFK', 'EZE', 'MEX', 'BKK' ],
                    the rest dupes 
                    ]
                    !! - with above with step ct > 4 I get below
                    ??-- missing ['HEL', 'JFK', 'PHX', 'LAX', 'MEX', 'LIM', 'BKK' ]
                    ??-- missing ['HEL', 'JFK', 'LAX', 'MEX', 'LIM', 'BKK' ]
                    ??-- missing ['HEL', 'JFK', 'LAX', 'MEX',  'BKK' ]
                    Master Array [
                   *[ 'HEL', 'JFK', 'PHX', 'LAX', 'MEX', 'BKK' ],
                    [ 'HEL', 'JFK', 'LAX', 'PHX', 'Failed Route' ],
                   *[ 'HEL', 'JFK', 'EZE', 'MEX', 'BKK' ],
                    [ 'HEL', 'JFK', 'EZE', 'MEX', 'BKK' ],
                   *[ 'HEL', 'JFK', 'EZE', 'MEX', 'LIM', 'BKK' ],
                    the rest dupes 
                    ]
                    !! - eze lim , just missing eze> jfk> phx> lax> mex> bkk> lim
                    // need to visit phx again from LAX - we need to track unused decisions from each node
                    Master Array [
                        [ 'EZE', 'JFK', 'PHX', 'LAX', 'MEX', 'LIM' ],
                        [ 'EZE', 'MEX', 'LIM' ],
                        [ 'EZE', 'JFK', 'LAX', 'PHX', 'Failed Route' ],
                        [ 'EZE', 'JFK', 'LAX', 'PHX', 'Failed Route' ],
                        [ 'EZE', 'JFK', 'LAX', 'MEX', 'LIM' ],
                        [ 'EZE', 'JFK', 'LAX', 'MEX', 'LIM' ],
                        [ 'EZE', 'JFK', 'LAX', 'MEX', 'BKK', 'LIM' ],
                        ]
                    >>> CONCLUSION IMPLEMENTATION ABOVE WORKS WE ARE JUST MISSING JFK - LAX - MEX , NEED TO REVISIT PRIOR CHOICES

                      */
                    pathsArray.push(finalDestination);
                    console.log('<<<<<<<<<<<< COMPLETE RESULT >>>>>> A ROUTE WASS FOUND !!', pathsArray);
                    targetfound = true;
                    // stepCt +=1;//moving this to the func call
                    // console.log("Step Ct is ", stepCt);
                    if ( !masterArray.includes(pathsArray) ) { masterArray.push(pathsArray); }
                    pathsArray = [];
                    break;
               // } 
             
              }
            if ( targetfound == true) { return}
            if ( targetfound === false)
                {
                if ( stepCt > 0  )
                    {
                        // console.log(" At top of step count")
                        let priorChoicesList = [];
                        let priorChoiceIndex = -1;
                        let availNextChoices = [];
                    //////////////////////////////////////////////////// 
                    /////////---> COLLECTING ALL PRIOR CHOICES MADE
                      if ( state == 0 )
                        {
                            priorChoicesList = [];
                        // FIND PRIOR CHOICES MADE IN MASTER ARRAY FOR CURRENT LOCATION NODE
                        console.log("? looking for prior choices made for node  ", departingNode)
                        for ( list of masterArray ){
                            priorChoiceIndex = -1;
                            try 
                                {
                                    priorChoiceIndex = list.indexOf(departingNode);
                                if ( priorChoiceIndex >= 0 && list[(priorChoiceIndex + 1 )] != 'Failed Route' )
                                    { 
                                        try { priorChoicesList.push( list[(priorChoiceIndex + 1 )]  ); }
                                        catch(ex){ console.log('! there was issue trying to get next choice from prior choice list', err);}
                                    }
                                }
                            catch(err){ console.log("! error with finding index pos of curr node in master array", err)}
                          }
                        if ( priorChoicesList.length > 0) { state = 1; } 
                        }

                    ////////////////////////////////////////////////////////////////////////// 
                    /////////---> PREPARING AVAILABLE CHOICES (NOT PREV MADE)
                    if ( state == 1 )
                        { // >> ONLY CHECK LIST IF IT IS FULL
                            /*
                            console.log("+  here are prior choices made from Node >>>> ", departingNode  ," >>>  ", priorChoicesList )
                            if ( priorChoicesList.includes('Failed Route')){
                                // NO NO NO -- do this-- save this bad node name which is the last item in the list  and then pop it off the list
                                console.log( "<>Found bad route in poss choices here is pre edit path array", pathsArray)
                                currBadNode = pathsArray[(pathsArray.length-1)] ;
                                console.log( "<< Here is the Bad Node destination found >>", currBadNode)
                                pathsArray.pop();
                                console.log( "-F-ound bad route in poss choices here is post edit path array", pathsArray)
                                lastGoodNode = pathsArray[(pathsArray.length-2)] ;
                                console.log(" Here is last good node ", lastGoodNode);
                            }
                            */
                                /*
                                with pop above I get 
                                Master Array [
                                *   [ 'EZE', 'JFK', 'PHX', 'LAX', 'MEX', 'LIM' ],
                                *   [ 'EZE', 'MEX', 'LIM' ],
                                    [ 'EZE', 'JFK', 'LAX', 'PHX', 'Failed Route' ],
                                *   [ 'EZE', 'JFK', 'LAX', 'MEX', 'LIM' ],
                                    [ 'EZE', 'JFK', 'LAX', 'Failed Route' ],
                                *   [ 'EZE', 'JFK', 'MEX', 'LIM' ],/// this is error impossible route
                                    [ 'EZE', 'JFK', 'MEX', 'LIM' ],
                                    [ 'EZE', 'JFK', 'MEX', 'LIM' ],
                                    [ 'EZE', 'JFK', 'MEX', 'Failed Route' ]
                                ]

                                ///////////////////////////////////////////////
                                without pop above  I get 
                                Master Array [
                                 *  [ 'EZE', 'JFK', 'PHX', 'LAX', 'MEX', 'LIM' ],
                                 *  [ 'EZE', 'MEX', 'LIM' ],
                                    [ 'EZE', 'JFK', 'LAX', 'PHX', 'Failed Route' ],
                                *   [ 'EZE', 'JFK', 'LAX', 'MEX', 'LIM' ],
                                    [ 'EZE', 'JFK', 'LAX', 'PHX', 'Failed Route' ],
                                    [ 'EZE', 'JFK', 'LAX', 'PHX', 'Failed Route' ],
                                    [ 'EZE', 'JFK', 'LAX', 'PHX', 'Failed Route' ],
                                    [ 'EZE', 'JFK', 'LAX', 'PHX', 'Failed Route' ],
                                    [ 'EZE', 'JFK', 'MEX', 'Failed Route' ]
                                  ]
                                  */
                                 

                             
                                /*
                                ///too much below 
                                choose the prior node in the array LAX
                                get curr location of bad node 
                                currLoc = pathsArray.IndexOf(departingNode)
                                select index pos dir before curr node
                                lastGoodNode = pathsArray[(currLoc - 1)] 
                                lastGoodNode = pathsArray[( pathsArray.IndexOf(departingNode) - 1  )] 

                                //////////////////////////////////////////////////
                                // splice exampe 
                                // loc = items.indexOf(removeItem); // my version
                                // items.splice(loc,1); // my version
                                items.splice( items.indexOf(removeItem),1 );/// mosh version
                                //////////////////////////////////////////////////
                                delete the current location PHX from array
                                choose any valid dest that is not JFK or PHX go to state 2  and figure it out 
                                create variable "PathCorrection = 0, 1, 2"
                                */
                                
                                // XXX XXX XXX XXX XXX XXX 
                            
                            
                            
                            
                                ////THIS DOESNT WORK!!!!
                            if( failedList.length > 0){ // we determined that prior choices list includes a bad path node we are deleting from the avial choices
                                // if ( departingNode == lastGoodNode && priorChoicesList.includes(    ))
                                for ( d = 0; d < failedList.length; d++  )
                                        {
                                            // console.log("DO THESE  MATCH",  failedList[d][1], ",", departingNode, 'and', failedList[d][2] , 'and', currBadNode );
                                        if ( failedList[d][1] == departingNode ) 
                                            {
                                                // if( priorChoicesList.includes(currBadNode) )
                                                //     {
                                                    console.log("THESE SHOULD  MATCH",  failedList[d][1], ",", departingNode);
                                                    console.log(" REMOVING BAD NODE", failedList[d][2], "from avail priorChoiceList", priorChoicesList);
                                                    priorChoicesList.splice( priorChoicesList.indexOf( failedList[d][2] )   )
                                                    console.log("Here is revised priorchocies" , priorChoicesList);
                                                    currBadNode = failedList[d][2];
                                                     break
                                                    // }
                                            }
                                            console.log('---THE DEPTARTING NODE---', departingNode,"---2ND ELEMENT OF FAILED LIST---", failedList[d][1],'---3RD ELEMENT IN FAILED LIST---', failedList[d][2]  );
                                        }
                                                        
                                        // console.log("REMOVE BAD NODE", currBadNode, "Here are Avail choices after removing bad node", priorChoicesList)
                                    }
                     //THIS DOES NOT WORK I DONT KNOW WHAT IS HAPPENING
                   /*
                                    for ( item of priorChoicesList ){
                                        if (  !pathsArray.includes( item ) )//IF CURR DEST DOES NOT INCLUDE PREV CHOICES MADE SAVE THEM FOR FUTURE CHECK
                                        // if (  !pathsArray.includes( currDest ) )//IF CURR DEST DOES NOT INCLUDE PREV CHOICES MADE SAVE THEM FOR FUTURE CHECK
                                           {
                                            availNextChoices.push(item);   
                                            }}
                                    console.log( '-T- This is the availNext choice list or lack of ', availNextChoices)
                                    // state = 2;
                                    if ( availNextChoices.length > 0 ) { state = 2 ; } else { state = 1.5}
                                }
              */

                           // THIS WORKS BUT IT DOESNT
                           console.log("This is destinationsArray", destinationsArray, 'checking priorchoices list does not include any of these' )
                            for ( currDest of destinationsArray  ){
                                if ( !priorChoicesList.includes( currDest ) && !pathsArray.includes( currDest ) && currDest != currBadNode )//IF CURR DEST DOES NOT INCLUDE PREV CHOICES MADE SAVE THEM FOR FUTURE CHECK
                                // if (  !pathsArray.includes( currDest ) )//IF CURR DEST DOES NOT INCLUDE PREV CHOICES MADE SAVE THEM FOR FUTURE CHECK
                                   {
                                    availNextChoices.push(currDest);   
                                    }}
                            console.log( '-T- This is the availNext choice list or lack of ', availNextChoices)
                            // state = 2;
                            if ( availNextChoices.length > 0 ) { state = 2 ; } else { state = 1.5}
                        }

                      /*T R Y  THIS  - IF THIS LIST COMES UP EMPTY IT DOESNT DO US MUCH GOOD SO 
                        PERHAPS WE THEN ASK WHEN THE CURR NODE WAS THE SAME INDEX NUMBER IN THE MASTER ARRAY WHAT 
                        CHOICES DID WE MAKE AND THEN REASSESS  
                        */
                    //////////////////////////////////////////////////// 
                    /////////---> COLLECTING ALL PRIOR CHOICES MADE from same index pos
                  /* >>>> UNLOCK THIS TO GET IT TO SORT OF WORK  
                    if ( state == 1.5 )
                    {
                        console.log('__state 1.5 >> We ARE REASSESSING PREV MOVES MADE SAME INDEX POS')
                        priorChoicesList = [];
                       for ( elm of masterArray ){
                        priorChoiceIndex = -1;
                        currIndexofNode = -2;
                        // console.log("this is an elm", elm)
                        try 
                            {
                                priorChoiceIndex = elm.indexOf(departingNode);
                                currIndexofNode = pathsArray.indexOf(departingNode);
                                if ( priorChoiceIndex >=0 && currIndexofNode >=0  &&   priorChoiceIndex == currIndexofNode )
                                { 
                                    // console.log("Here are the prior and curr index", priorChoiceIndex, currIndexofNode );
                                    try { 
                                        priorChoicesList.push( elm[(priorChoiceIndex + 1 )]  ); 
                                        // console.log("this is item pushed to revised Choices", elm[(priorChoiceIndex + 1 )] )
                                        }
                                    catch(ex){ console.log('! there was issue trying to get next choice from prior choice list', err);}
                                }
                            }
                        catch(err){ console.log("! error with finding index pos of curr node in master array", err)}
                        }
                        state = 1.75;
                    }

                  */


                    //     if ( priorChoicesList.length > 0) 
                    //     {   console.log(" --T-H-E--   REVISED PRIOR MOVES LIST", priorChoicesList);
                        
                    //     if ( priorChoicesList.includes('Failed Route') )
                    //         {
                    //            // backup and choose another option for prior prior node  
                    //         }

                    //         state = 1.75; 
                    //     } 
                    // }
                   /*
                    if ( state == 1.75 )///THIS DOESNT WORK SO FIX IT  WITH FAILED ROUTES ETC
                        {
                            if( failedList.length > 0){
                            // if ( departingNode == lastGoodNode && priorChoicesList.includes(    ))
                            for ( d = 0; d < failedList.length; d++  )
                                    {
                                    if ( failedList[d][1] == departingNode &&  failedList[d][2] == currBadNode ) 
                                        {
                                            if( priorChoicesList.includes(currBadNode) )
                                                {
                                                 priorChoicesList.splice( priorChoicesList.indexOf(currBadNode)   )
                                                 break
                                                }
                                        }
                                    }
                         availNextChoices = priorChoicesList;
                          if ( availNextChoices.length > 0 ) { state = 2 ; }
                        } }
                        */


                     /* >>> UNLOCK THIS TO GET IT TO SORT OF WORK  
                       if ( state == 1.75 )///THIS DOESNT WORK SO FIX IT  WITH FAILED ROUTES ETC
                       { // >> ONLY CHECK LIST IF IT IS FULL
                        //    console.log("+  here are prior choices made from Node >>>> ", departingNode  ," >>>  ", priorChoicesList )
                           for ( currDest of destinationsArray  ){
                               if ( !priorChoicesList.includes( currDest ) && !pathsArray.includes( currDest ) )//IF CURR DEST DOES NOT INCLUDE PREV CHOICES MADE SAVE THEM FOR FUTURE CHECK
                                   {
                                   availNextChoices.push(currDest);   
                                   }}
                           console.log( '_._THIS SHOULD BE ALL PRIOR MOVES MADE FROM SAME INDEX POS ', availNextChoices)
                           if ( availNextChoices.length > 0 ) { state = 2 ; }
                       }
                      */



                    let theChoice = '';
                    ////////////////////////////////////////////////////////////////////////////// 
                    /////////---> ASSESSING PREV CHOICES MADE -- ASSIGNING NEW CHOICE
                    if ( state == 2 &&  newDestinationFound == false )
                        { // >> ONLY CHECK LIST IF IT IS FULL
                            console.log("> looking at choices never made and assessing them, they are availNextChoices :> ", availNextChoices)
                            let checkNumDest = [];
                        for ( possChoice of availNextChoices )
                            {
                                theChoice = '';
                                console.log('- Assessing This for poss Next Node Choice  --> ', possChoice);
                                checkNumDest = adjancencyList.get(possChoice);//get destinations for new element, if it has more than one destination meaning it is not a deadend then keep going with it
                                console.log('%+% The new Check Destinations is', checkNumDest );
                                                
                                if (checkNumDest.length==1) // if only has on destination its a dead end , dont use it
                                    console.log('~ the new choice', possChoice, 'node only has one destination', checkNumDest,'revert back to prior pick'); 
               
                                if (checkNumDest.length > 1 )
                                    {    
                                    let matchCt = 0;

                                    for ( dest of checkNumDest)  { if( pathsArray.includes(dest) ) matchCt +=1;   }
                                    
                                    if ( matchCt == checkNumDest.length ) ///////////---> CHECK FAILED ROUTE :
                                        {
                                        pathsArray.push( possChoice);  pathsArray.push('Failed Route');
                                        console.log("** The length of new poss checkNumDest.length  is", checkNumDest.length,'the match count is ', matchCt);
                                        console.log("** The length of new poss availNextChoices.length is", availNextChoices.length,'the match count is ', matchCt);
                                        console.log("<<<<<FAILED ROUTE >>> The number of possible choices avail = are already in the path array")
                                        location = 'Failed Route';   theChoice = 'Failed Route;'
                                        console.log("- breaking out (-o-) (0) (-o-) "); // THIS WORKS----!!!!
                                        break;
                                        }
                                    else {
                                    newDestinationFound = true;
                                    theChoice =possChoice;
                                    location = theChoice;
                                    state = 0;
                                // location =  destinationsArray[destination]; 
                                    }
                                } 
                            } // END FOR LOOP WITHIN STATE 2   

                                console.log("-@- Assessing the theChoice", theChoice) 

                                if ( theChoice == '' ) 
                                    {
                                     theChoice = priorChoicesList[ ( priorChoicesList.length - 1 ) ];  
                                     if ( !pathsArray.includes(theChoice)  ) { location = theChoice; choiceMade = true ; } 
                                     else  { location =  destinationsArray[destination]; }
                                    }
                        } //END STATE 2
                    ///////////////////////////////////////////////////////////////////////////////////////////////////////

                        // state = 0; // MAYBE KEEP THIS HERE 
                        console.log('-?- Thechoice is ', theChoice , "the state is ", state);
                        console.log("-b- bottom of recurssion loop deciding the exit or call func again")
                        if( typeof theChoice == 'undefined'|| typeof location =='undefined'){location = 'Failed Route'; }

                        if( location == 'Failed Route') { 
                            console.log( " =FF=  LOCATION == Failed Route creating Failed List")
                            //HERE ADD LAST 3 TO FAILED LIST 
                            tempPathList = [];
                            for ( locs of pathsArray ) tempPathList.push(locs);
                            tempFailList = [];
                            tempPathList.reverse();
                            // tempPathList.reverse();
                            // for ( i=1; i<4; i++ ){ tempFailList.push(  tempPathList[i]   ); }  
                            for ( i=0; i<3; i++ ){ if ( tempPathList[i] != 'Failed Route') { tempFailList.push(  tempPathList[i]   ); }}  
                            tempFailList.reverse();

                            failedList.push(tempFailList);
                            
                            // if( tempFailList.length >= 3){ failedList.push(tempFailList);}
                            console.log("breaking out (-) (+) (-) "); 
                            break;
                        
                        }// THIS WORKS----!!!!

                    ///////////////////////////////////////////////////////////////////////////////////////////////////////
                        } // END step count 
                    ///////////////////////////////////////////////////////////////////////////////////////////////////////
                    }  // END target found false  
                    ///////////////////////////////////////////////////////////////////////////////////////////////////////
                    if( location == 'Failed Route'){ console.log("breaking out (!) (@) (!) "); return;}
                    // if( typeof theChoice == 'undefined' && typeof location =='undefined' ){ location = 'Failed Route'; console.log("returning out (~) (W) (~) "); return;}
                    if ( location == currBadNode ){ location = destinationsArray.indexOf[(currBadNode+1)]; console.log("Extracting Bad Node at Last minute", currBadNode) ;} 
                    console.log('-d- destination chosen is  <<<<<',location, '>>>>>>>>');

                    // if (  location =='undefined' || location !='Failed Route') { break}

                    //////////////////////////////////////////////////// 
                    /////////---> RECURRSIVE CALL :
                    //////////////////////////////////////////////////// 
                    if ( (typeof location !='undefined' || location =='Failed Route')  &&  !pathsArray.includes(location) && !pathsArray.includes(finalDestination) )//we dont want to search departing nodes more than once
                    // if (   location !='Failed Route' && !pathsArray.includes(location) && !pathsArray.includes(finalDestination) )//we dont want to search departing nodes more than once
                        {
                            pathsArray.push(location);
                            newDestinationFound =false;
                            console.log("-C- calling new func with this location --", location , "--");
                            state = 0;
                            if ( stepCt < maxSteps && location != 'Failed Route' ) buildPath3(location);
                            if ( location == 'Failed Route'){ console.log(" !!! - Location == Failed Route Exiting recurssion - !!! "); return;}
                            if ( stepCt > maxSteps ){ console.log( " step count exceeded Max exiting Recurssion"); return}
                        }

                    if (  location == 'Failed Route' ){   break;}  
                } // End for loop
                    
                   if (   location == 'Failed Route' ) { 

                       if(  !pathsArray.includes(location) ){  pathsArray.push(location); }
                       console.log("breaking out of func failed route"); 
                       masterArray.push(pathsArray); 
                       return;
                    } //stepCt +=1 ;
            } // end if this is array??    
        else { 
              console.log('this is not an array exiting func'); 
              return; 
             }
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
}// END funct

// THIS IS A GOOD ONE SHOULD HAVE AT LEAST 4 DIFF ROUTES
// let startingPt = 'LIM';
// let finalDestination ='HEL' ;

/// THIS ONE MISSED LAX TO MEX AS THE 4TH CHOICE
/*
let startingPt = 'HEL';
let finalDestination ='BKK' ;
*/

let startingPt = 'EZE';
let finalDestination ='LIM' ;

console.log();
console.log('|------------------------------------------------|');
console.log("|_+_+_+_+_+_+ STARTING FUNCTION _+_+_+_+_+_+_+_+_|")
console.log('|------------------------------------------------|');
console.log();
while (stepCt < maxSteps )
{   
    console.log(`find route between`, startingPt, 'and', finalDestination);
         targetfound = false;
         newDestinationFound =false;
         console.log("Calling Build Path From OUtside Func")
         stepCt +=1;
         console.log("step count is ", stepCt);
         state = 0;
         pathsArray = [];
         buildPath3( startingPt );
         console.log('Master Array', masterArray);
}




  //// TUTORIAL DEPTH FIRST SEARCH WITH RECURSSION 

  function dfs(start, visited = new Set() ) {
      console.log(start)
      visited.add(start);// ADD CITY CALLING THIS FUNC
      const destinations = adjancencyList.get(start);

      for (  destination of destinations ){
          if ( destination == finalDestination){ 
              console.log(`DFS FOUND FINAL DESTINATION IN STEPS`);
              visited.add(destination);
              console.log('here is the path', visited);
          }
          if ( visited.has(finalDestination) ){ return}
          if( !visited.has(destination)){
              dfs(destination, visited);
          }
      }
  }
  console.log(`find route between`, startingPt, 'and', finalDestination);

//   dfs(startingPt)