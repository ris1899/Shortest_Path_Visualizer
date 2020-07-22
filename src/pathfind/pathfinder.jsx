import React, { Component } from "react";
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';
import {astar, getNodesInShortestPathOrder2} from '../algorithms/astar';
import './pathfinder.css';
import './Node/Node.css';

var START_NODE_ROW = 4;
var START_NODE_COL = 14;
var FINISH_NODE_ROW = 1;
var FINISH_NODE_COL = 47;

export default class Pathfinder extends Component {
	
	constructor(){
		super();
		this.state={
			grid:[],
			mouseIsPressed:false,
			endIsPressed:false,
			startIsPressed:false,
		};
	}
	componentDidMount(){
       const grid=getInitialGrid();
		this.setState({grid});
		
	}

	handleMouseDown(row,col){
		   if(FINISH_NODE_ROW===row && FINISH_NODE_COL===col){
			  this.setState({endIsPressed:true,mouseIsPressed:true});
		   }
  		 else if(START_NODE_ROW===row && START_NODE_COL===col){
			 this.setState({startIsPressed:true,mouseIsPressed:true});
		 }
		   else{
			  const newGrid= getNewGridWithWallToggled(this.state.grid,row,col);
			
		     this.setState({grid:newGrid,mouseIsPressed:true});	 
		   }  
		}
	handleMouseEnter(row,col){
		if( this.state.mouseIsPressed===false)return;
		if(this.state.endIsPressed===true){
			const newGrid=this.state.grid.slice();
			const node=newGrid[FINISH_NODE_ROW][FINISH_NODE_COL];
			const newNode={...node}
		   newNode.isWall=false; newNode.distance=Infinity;newNode.isVisited=false;newNode.isFinish=false;
	       newNode.previousNode=null;newNode.hDistance=Infinity;newNode.totalDistance=500;
		  //document.getElementById(`node-${newNode.row}-${newNode.col}`).className='node';
			newGrid[FINISH_NODE_ROW][FINISH_NODE_COL]=newNode;
			const x=newGrid[row][col];
			x.isWall=false; x.distance=Infinity; x.isFinish=true;
					//document.getElementById(`node-${x.row}-${x.col}`).className='node node-finish';
			newGrid[row][col]=x;
			FINISH_NODE_ROW=row;
			FINISH_NODE_COL=col;
			this.setState({grid:newGrid});
			return;
		}
	if(this.state.startIsPressed===true){
			const newGrid=this.state.grid.slice();
			const node=newGrid[START_NODE_ROW][START_NODE_COL];
			const newNode={...node}
		   newNode.isWall=false; newNode.distance=Infinity;newNode.isVisited=false;newNode.isStart=false;newNode.isFinish=false; 
	       newNode.previousNode=null;newNode.hDistance=Infinity;newNode.totalDistance=500;
		  //document.getElementById(`node-${newNode.row}-${newNode.col}`).className='node';
			newGrid[START_NODE_ROW][START_NODE_COL]=newNode;
			const x=newGrid[row][col];
			x.isWall=false; x.distance=Infinity; x.isStart=true; x.isFinish=false;
					document.getElementById(`node-${x.row}-${x.col}`).className='node node-start';
			newGrid[row][col]=x;
			START_NODE_ROW=row;
			START_NODE_COL=col;
			this.setState({grid:newGrid});
			return;
		}
		   const newGrid=getNewGridWithWallToggled(this.state.grid,row,col);
		this.setState({grid:newGrid});	
	}
	handleMouseUp(){
		
		this.setState({mouseIsPressed:false,endIsPressed:false,startIsPressed:false });
	}
	
	clearWalls(){
		
		const newGrid=getClearWalls(this.state.grid);
		
		this.setState({grid:newGrid});
	}
	clearPath(){
		const newGrid=getClearPath(this.state.grid);
		
		this.setState({grid:newGrid});
	}
	
	animateAlgo(visitedNodesInOrder,nodesInShortestPathOrder){
		
		for(let i=0;i<=visitedNodesInOrder.length;i++){
			if(i===visitedNodesInOrder.length){
				setTimeout(()=>{
					this.animateShortestPath(nodesInShortestPathOrder);
				},10*i);
				return;
			}
			
			setTimeout(()=>{
				const node=visitedNodesInOrder[i];
				document.getElementById(`node-${node.row}-${node.col}`).className=
					'node node-visited';
				
				this.setState()
			},10*i);
		}
	}
	animateShortestPath(nodesInShortestPathOrder){
		//this.showAlert(); return ;
			
		for(let i=0;i<nodesInShortestPathOrder.length;i++){
			
			setTimeout(()=>{
				const node=nodesInShortestPathOrder[i];
				document.getElementById(`node-${node.row}-${node.col}`).className=
					'node node-shortest-path';
			},50*i);
		}
	}
	visualizeDijkstra(){
		const newGrid=getClearPath(this.state.grid);
		this.setState({grid:newGrid});
		
		const {grid}=this.state;
		const startNode=grid[START_NODE_ROW][START_NODE_COL];
		const finishNode=grid[FINISH_NODE_ROW][FINISH_NODE_COL];
		const visitedNodesInOrder=dijkstra(grid,startNode,finishNode);
		const nodesInShortestPathOrder= getNodesInShortestPathOrder(finishNode);
		this.animateAlgo(visitedNodesInOrder,nodesInShortestPathOrder);
	}
	visualizeAstar(){
		const newGrid=getClearPath(this.state.grid);
		this.setState({grid:newGrid});
		
		const {grid}=this.state;
		const startNode=grid[START_NODE_ROW][START_NODE_COL];
		const finishNode=grid[FINISH_NODE_ROW][FINISH_NODE_COL];
		const visitedNodesInOrder=astar(grid,startNode,finishNode);
		const nodesInShortestPathOrder= getNodesInShortestPathOrder2(finishNode);
		this.animateAlgo(visitedNodesInOrder,nodesInShortestPathOrder);
	}
	render(){
		const {grid,mouseIsPressed}=this.state;
		return(
			<div>
			<div>
		     <nav  class="navbar navbar-expand-lg navbar-light bg-dark">
				 <svg  className="navi" width="1em" height="1em" viewBox="0 0 16 16"                                          fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M12.5 2h-9V1h9v1zm-10 
								   1.5v9h-1v-9h1zm11 9v-9h1v9h-1zM3.5 14h9v1h-9v-1z"/>
                             <path fill-rule="evenodd" d="M14 3a1 1 0 1 0 0-2 1 1 0 0 0 
							   0 2zm0 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 1a2 2 0 1 0                                       0-4 2 2 0 0 0 0 4zM2 3a1 1 0 1 0 0-2 1 1 0 0 
							  0 0 2zm0 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 11a1 1 
						 0 1 0 0-2 1 1 0 0 0 0 2zm0 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
				 
				 <ul></ul>
				 <h2  className="navi">Shortest Path Visualizer</h2>
                 <div class="collapse navbar-collapse" id="navbarSupportedContent">
					  <ul class="navbar-nav mr-auto"></ul><ul class="navbar-nav mr-auto"></ul> 
 					 
					<ul class="navbar-nav mr-auto">	  
					<button class="btn btn-success btn-md "
						onClick={()=>this.visualizeAstar()}><em>A* Algorithm</em></button>
					 </ul>	
					<ul class="navbar-nav mr-auto">  
					<button class="btn btn-success btn-md"
						onClick={()=>this.visualizeDijkstra()}><em>Dijkstra Algorithm</em></button>  
	                </ul>
                     <ul class="navbar-nav mr-auto">
                         <a href="/" class="btn btn-danger btn-sm active"><em>Clear Board</em></a>                                        </ul>
					<ul class="navbar-nav mr-auto">  
					<button class="btn btn-success btn-md"
						onClick={()=>this.clearWalls()}><em>Clear Walls</em></button>  
	                </ul>
					 
                          </div>
                      </nav>
				<nav  class="navbar navbar-expand-lg navbar-light white">
						<div class="node node-start"></div><em>START NODE</em>
					    <div class="span"></div>
				        <div class="node node-finish"></div><em>FINISH NODE</em>
					 	<div class="span"></div>
				        <div class="node node-wall"></div><em>WALL</em>
					    <div class="span"></div>
					    <div class="node node-final"></div><em>FINAL PATH</em>
				</nav>
				
			</div>
				
			<div className="grid">
				{
					this.state.grid.map((row,rowIdx)=>{
						return (
							
							<div key={rowIdx}>
								
								{row.map((node,nodeIdx)=>{
									const {col,row,isStart,isFinish,isWall}=node;
									return(	
										<Node
											key={nodeIdx}
											row={row}
											col={col}
											isStart={isStart}
											isFinish={isFinish}
											isWall={isWall}
										    mouseIsPressed={mouseIsPressed}
											onMouseDown={(row,col)=>this.handleMouseDown(row,col)}
											onMouseEnter={(row,col)=>this.handleMouseEnter(row,col)}
											onMouseUp={()=>this.handleMouseUp()}
											>
										</Node>
											
										
									);
								}) }
								
							</div>
						);
						
					})
				}
			</div>
			</div>
		);
		
	}
		
			
	
}
const getInitialGrid=()=>{
	 const grid=[];
	 for(let row=0;row<18;row++)
		 { const currentRow=[];
			 for(let col=0;col<55;col++)
				 { currentRow.push(createNode(col,row)); }
				grid.push(currentRow);
		 }
	 return grid;
 }
const createNode=(col,row)=>{
	return {col, row,
	isStart: row===START_NODE_ROW && col===START_NODE_COL,
    isFinish: row===FINISH_NODE_ROW && col===FINISH_NODE_COL,
	distance:Infinity,
	isVisited:false,
	isWall: false,
	previousNode:null,
	hDistance:Infinity,
	totalDistance:500,		
		  }	
}
const getNewGridWithWallToggled=(grid,row,col)=>{
	const newGrid=grid.slice();
	const node=grid[row][col];
	const newNode={
		...node,
		isWall: !node.isWall,
	}
	//if(node.isStart==)
	newGrid[row][col]=newNode;
	return newGrid;	
}

const getClearWalls = (grid)=>{
	const newGrid=grid.slice();
	for(let row=0;row<newGrid.length;row++){
			for(let col=0;col<newGrid[0].length;col++){
				const node=newGrid[row][col];
				const newNode={...node}
				if(newNode.isWall===true){
					document.getElementById(`node-${newNode.row}-${newNode.col}`).className='node';
					if(row===START_NODE_ROW && col===START_NODE_COL){
						newNode.isStart=true;
						document.getElementById(`node-${newNode.row}-${newNode.col}`).className='node node-start';
					  }
					else{newNode.isStart=false;}
					
					 if(row===FINISH_NODE_ROW && col===FINISH_NODE_COL){
						 newNode.isFinish=true;
						 document.getElementById(`node-${newNode.row}-${newNode.col}`).className='node node-finish';
					 }
					else{newNode.isFinish=false;}
					newNode.isWall=false;
	                 newNode.distance=Infinity;
	                 newNode.isVisited=false;
	                 newNode.isWall=false;
	                  newNode.previousNode=null;
	              newNode.hDistance=Infinity;
	            newNode.totalDistance=500;	
				   	
				}
					
				newGrid[row][col]=newNode;
			}
		}
	return newGrid;
}
const getClearPath = (grid)=>{
	const newGrid=grid.slice();
	for(let row=0;row<newGrid.length;row++){
			for(let col=0;col<newGrid[0].length;col++){
				const node=newGrid[row][col];
				const newNode={...node};
				if(newNode.isVisited===true && newNode.isWall===false){
				  document.getElementById(`node-${newNode.row}-${newNode.col}`).className='node';
					
					if(row===START_NODE_ROW && col===START_NODE_COL){
						newNode.isStart=true;
						document.getElementById(`node-${newNode.row}-${newNode.col}`).className='node node-start';
					}
					else{newNode.isStart=false;}
					
					 if(row===FINISH_NODE_ROW && col===FINISH_NODE_COL){
						 newNode.isFinish=true;
						 document.getElementById(`node-${newNode.row}-${newNode.col}`).className='node node-finish';
					 }
					else{newNode.isFinish=false;}
					
                  	 newNode.isWall=false;
	                 newNode.distance=Infinity;
	                 newNode.isVisited=false;
	                
	                  newNode.previousNode=null;
	              newNode.hDistance=Infinity;
	            newNode.totalDistance=500;
					
				}
				
				newGrid[row][col]=newNode;
			}
		}
	return newGrid;
}

	