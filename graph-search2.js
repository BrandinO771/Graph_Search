

// OUR GRAPH:
//--> Map() =BEHAIVES LIKE DICTIONARY, OR HASHMAP, HAS API FEATURES
const adjancencyList = new Map();

function buildAdjList(){
    // https://www.youtube.com/watch?v=cWNEl4HE2OE&list=PLBDuVpwoLMoJxKDT5W2-sptUxwhmlTdZ0&index=13&t=0s
    const airports  = 'PHX BKK OKC JFK LAX MEX EZE HEL LOS LAP LIM'.split(' '); 
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
}

buildAdjList();


function pathFind1(startPt, endPt){

let state = 0;
let deadEnds = [];
let masterRoutes = [];
let currPath = [];
let destinationsArray =[];
let branch1 = [];
let currNodeParent ='';
let route =[];
let currRoute =[];
let count = 0;
let currNode = '';

while ( state < 101){


//-- INSERT STARTING PT TO CURRPATH
if ( !currPath.includes(startPt) ) 
    {
    currPath.push(startPt);
    currNodeParent = startPt;
    currRoute.push( { node : currNodeParent, nodeDestinations : ['Frog', 'Bunny'] } ) ;
    }


// console.log("the test route", currRoute);
// console.log("the  testRoute[0].node", currRoute[0].node);
// console.log("the   testRoute[0].nodeDestinations", currRoute[0].nodeDestinations); 
// console.log("the   testRoute[0].nodeDestinations[0]", currRoute[0].nodeDestinations[0]); 


// console.log("the  testRoute[0].node[0]", testRoute[0].node[0]);

    if ( state == 0) // TRAVEL DOWN PATH LOOKING FOR FIRST BRANCH
        {  
        //-- GET ALL CHILDREN OF START PT
            destinationsArray = adjancencyList.get(currNodeParent);
            // testRoute[0].nodeDestinations = destinationsArray;
        //--IF END PT FOUND ADD TO LIST AND EXIT :
            if ( destinationsArray.includes(endPt)) { currPath.push(endPt); state = 100; }
        //--ADD TO CURR PATH IF DONT HAVE IT :
            if (  !currPath.includes(currNodeParent) ) { currPath.push(currNodeParent);  } 
        //-CONTINUE IF HAVE MULTIPLE DEST :
            if (state == 0 && destinationsArray.length > 1 ) { state = 1;}
        //-STAY HERE IF ONLY HAVE ONE DEST :
            if (state == 0 && destinationsArray.length == 1 ) {currRoute[0].nodeDestinations = destinationsArray;  currNodeParent = destinationsArray[0]; state = 0; }
        console.log("The State =",state, "the currPath=", currPath, "the currNodeParent=",currNodeParent);
        console.log("STATE =", state, "test route=", currRoute);
        }

    if ( state == 1) // ESTABLISH FIRST BRANCHES :
        {  
        ///-- FOR EACH DEST IF IS NOT THE END PT && HAS ATLEAST 2 CHILDREN ADD TO 
        ///-- STARTING BRANCH, IF ONLY HAS ONE CHILD ADD TO DEADEND LIST 
            for ( child of destinationsArray )
                {
                let evalArray = [];
                evalArray = adjancencyList.get(child);
            //--IF END PT FOUND ADD TO LIST AND EXIT :
                if ( child == endPt )   { currPath.push(endPt);  state = 100; break; }
                if ( state == 1){
                //--CHECK EACH CHILD OF CURR DESTINATIONS -> ADD TO DEADEND LIST -> IF ZERO CHILDREN
                    if ( evalArray.length == 1 && !deadEnds.includes(child) && child != endPt ) { deadEnds.push(child);}
                //--IF HAVE MORE THAN ONE CHILD -PUSH TO BRANCH LIST     
                    if ( evalArray.length  > 1 && !branch1.includes(child) )                    { branch1.push(child);}
                    }
                }
            console.log(`{state is} ${state}, currPath=${currPath} < Here > deadend list, ${deadEnds} , branch1 list ${branch1}`);
            currRoute.push( { node : currNodeParent, nodeDestinations : [ branch1[0] ] } ) ;// only first element in branch
            console.log("STATE =", state, "test route=", currRoute);
            state =2; 
        }
    if ( state == 2 )// EXPLORE BRANCH
        {  
            count +=1
            //-GRAB FIRST ELEMENT OF BRANCH
            
            if ( branch1.length > 0){ currNode = branch1[0]; state = 3;} else  { state = 100; break; } 

        }
    if ( state == 3 )// EXPLORE BRANCH
        {  
            count+=1;
            //--IF WE HAVENT SET THE CURRNODE - CUZ WE ARE EXPLORING A BRANCH PATH
            //---THEN GRAB THE FIRST ELEMENT IN THE NODEDESTINATIONS OF THE LAST DICTIONARY ENTRY
            console.log('currRoute[(currRoute.length-1)].nodeDestinations[0] ',currRoute[(currRoute.length-1)].nodeDestinations[0] );
            if( currNode == ''){  currNode = currRoute[(currRoute.length-1)].nodeDestinations[0]   }
            console.log('state is', state, 'currnode is', currNode);
            let tempList = [];
            //-- CHECK ITS DESTINATIONS 
            evalArray = adjancencyList.get(currNode);//lax, jfk, phx
            console.log('for curr node', currNode, 'here are the destinations' , evalArray);

            //--IF END PT FOUND ADD TO LIST AND EXIT :
                   
                // if ( currNode == endPt  && !currPath.includes(endPt) )   { currPath.push(endPt);  console.log('+++ ENDING HERE!');  state = 100;  }
                //--CHECK EACH CHILD OF CURR DESTINATIONS -> ADD TO DEADEND LIST -> IF ZERO CHILDREN
                       //  IS PHX IS NOT A DEADEND          
                if (state ==3){         
                    if ( evalArray.length == 1 && !deadEnds.includes(currNode) && currNode != endPt ) { deadEnds.push(currNode);}
                //--IF HAVE MORE THAN ONE CHILD -PUSH TO BRANCH LIST    , IT HAS LAX, AND JFK, ONLY LAX SHOULD BE INCLUDED 
                    if ( evalArray.length  > 1 )                 
                      { 
                        for ( moreChildren of evalArray  )//look at currNoderen of curr 
                            {
                             if( !deadEnds.includes(moreChildren)  &&  !currPath.includes(moreChildren) )// || (branch1.includes(moreChildren) && currPath.includes(moreChildren)))   ) 
                                {
                                // if ( branch1.includes(moreChildren) && currPath.includes(moreChildren)  ) { 
                                tempList2=[];
                                tempList2 = adjancencyList.get(moreChildren);
                                if ( tempList2.length > 1 || moreChildren == endPt)
                                tempList.push(moreChildren) //
                                }
                            }
    
                            console.log("TempList:", tempList);
                    //--ADD TO FINAL LISTS         
                        if ( tempList.length>0)
                           {
                            if( !currPath.includes(currNode) && !deadEnds.includes(currNode)   )
                                {
                                currPath.push(currNode); 
                                currRoute.push( { node : currNode, nodeDestinations : tempList} ) ;
                                }
                            }
                        }
            if ( currNode == endPt ) 
                {
                    if ( !currPath.includes(endPt) ){ currPath.push(endPt);}  
                        console.log('+++ ENDING HERE!');  
                        state = 100;  
                 }
            
                        /*
            if ( evalArray.includes(endPt) && !currPath.includes(endPt) )   
                { 
                    currPath.push(endPt);  
                    console.log('*-*-* ENDING HERE!');
                    state = 100;  
                }
            */
            console.log(`{state is} ${state}, currPath=${currPath} < Here > deadend list, ${deadEnds} , branch1 list ${branch1}`);
            console.log("STATE =", state, "test route=", currRoute);
            currNode='';
            console.log('the count', count);
            if ( state == 3 && count <8 ) {state =3;}else{state =100;} 
        }}
           
    if ( state == 4)///--ITERATE THROUGH DIC IF NODE HAS MULTIPLE DESTINATION ATTEMPT TO RESOLVE ALL VARIOUS PERMUTATIONS
        {
            console.log("STATE =", state, "test route=", currRoute);

        }
    if ( state == 100 )
        {  
            // query = 'JFK';
            query = 'EZE';

            q_filter =[];
            // --> QUICKLY CHECK DICT FOR MATCH  WITH FILTER 
            
            //-->EXAMPLE : CHECK DICT  STRINGS FOR MATCH
            // q_filter = currRoute.filter( n =>  n.node == query ||  n.node == 'MEX' ) ;

            //-->EXAMPLE : CHECK DICT  ARRAYS FOR MATCH
            q_filter = currRoute.filter(   n =>  n.nodeDestinations.includes(query) );
            // q_filter = currRoute.filter( n =>  n.nodeDestinations.length > 1 ) ; 
            // q_filter = currRoute.filter( n =>  n.nodeDestinations[0] == 'PHX') ; 
            // q_filter = currRoute.filter( n =>  n.nodeDestinations[2] == 'EZE') ; 
                            





            console.log('the q_filter' , q_filter);
            // .filter( obj => obj.value > 2);

            if( q_filter.length > 0 ) 
                { console.log('the route includes', query); }
                else
                { console.log('the route does not Include', query); }


            console.log( ' success we have found a path ', currPath);
            state =101 ; 
            return
        }


/////
 } // end while loop
//// 
} // end funct
////
// pathFind1('BKK', 'LOS');
pathFind1('LOS','BKK');



/*
//////////////////////////////////////////////////////////////////
 for 
pathFind1('LOS', 'BKK');

{state is} 3, currPath=LOS,JFK,PHX,LAX,MEX < Here > deadend list, OKC,LOS,HEL , branch1 list PHX,EZE,LAX
STATE = 3 test route= [
  { node: 'LOS', nodeDestinations: [ 'JFK' ] },
  { node: 'JFK', nodeDestinations: [ 'PHX', 'EZE', 'LAX' ] },
  { node: 'PHX', nodeDestinations: [ 'LAX' ] },
  { node: 'LAX', nodeDestinations: [ 'MEX' ] },
  { node: 'MEX', nodeDestinations: [ 'BKK', 'LIM', 'EZE' ] }
]
the count 4
currRoute[(currRoute.length-1)].nodeDestinations[0]  BKK
state is 3 currnode is BKK
for curr node BKK here are the destinations [ 'MEX', 'LIM' ]
 success we have found a path  [ 'LOS', 'JFK', 'PHX', 'LAX', 'MEX', 'BKK' ]
//////////////////////////////////////////////////////////////////////
 for 
pathFind1('BKK', 'LOS');

{state is} 100, currPath=BKK,MEX,LAX,PHX,JFK,LOS < Here > deadend list,  , branch1 list MEX,LIM
STATE = 100 test route= [
  { node: 'BKK', nodeDestinations: [ 'Frog', 'Bunny' ] },
  { node: 'BKK', nodeDestinations: [ 'MEX', 'LIM' ] },
  { node: 'MEX', nodeDestinations: [ 'LAX', 'LIM', 'EZE' ] },
  { node: 'LAX', nodeDestinations: [ 'PHX', 'JFK' ] },
  { node: 'PHX', nodeDestinations: [ 'JFK' ] },
  { node: 'JFK', nodeDestinations: [ 'LOS', 'EZE' ] }
]
the count 5
currRoute[(currRoute.length-1)].nodeDestinations[0]  LOS
state is 3 currnode is LOS
for curr node LOS here are the destinations [ 'JFK' ]
 success we have found a path  [
  'BKK', 'MEX',
  'LAX', 'PHX',
  'JFK', 'LOS',
  'LOS'
]




                // if ( currNode == endPt || evalArray.includes(endPt) )   { currPath.push(endPt);  state = 100;  }

*/

