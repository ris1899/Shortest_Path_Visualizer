
export function astar(grid,startNode,finishNode){
	 const visitedNodesInOrder=[];
	startNode.distance=0;
	
	const unvisitedNodes=getAllNodes(grid,finishNode);
	while(unvisitedNodes.length!==0){
		sortNodesByTotalDistance(unvisitedNodes);
		const closestNode=unvisitedNodes.shift();
		if(closestNode.isWall)continue;
		if(closestNode.totalDistance>=500)return visitedNodesInOrder;
		closestNode.isVisited=true;
	    visitedNodesInOrder.push(closestNode);
		if(closestNode===finishNode) return visitedNodesInOrder;
	    updateUnVisitedNeighbours(closestNode,grid);
	}
}

function updateUnVisitedNeighbours(node,grid){
	const unvisitedNeighbours = getUnVisitedNeighbours(node,grid);
	for(const neighbour of unvisitedNeighbours){
		neighbour.distance=node.distance+1;
		neighbour.totalDistance=neighbour.distance+neighbour.hDistance;
		neighbour.previousNode=node;
	}
}
function getUnVisitedNeighbours(node,grid){
	const neighbours=[];
	const {row,col}=node;
	if(row>0) neighbours.push(grid[row-1][col]);
	if(row<grid.length-1) neighbours.push(grid[row+1][col]);
	if(col>0) neighbours.push(grid[row][col-1]);
	if(col<grid[0].length-1)neighbours.push(grid[row][col+1]);
	return neighbours.filter((neighbour)=> !neighbour.isVisited );
	
}
function getAllNodes(grid,finishNode){
	 const nodes=[];
	for(const row of grid){
		for(const node of row){
			node.hDistance= Math.abs(node.row- finishNode.row)+Math.abs(node.col-finishNode.col);
			node.totalDistance=node.distance+node.hDistance;
			nodes.push(node);}
	}
	return nodes;
}
function sortNodesByTotalDistance(unvisitedNodes){
	unvisitedNodes.sort((nodeA,nodeB)=>nodeA.totalDistance-nodeB.totalDistance);
}
export function getNodesInShortestPathOrder2(finishNode){
	const nodesInShortestPath=[];
	let currentNode=finishNode;
	while(currentNode!==null){
		nodesInShortestPath.unshift(currentNode);
		currentNode=currentNode.previousNode;
	}
	return nodesInShortestPath;
}
