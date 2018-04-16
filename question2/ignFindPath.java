/**
 *  Find if a path exists from any random start of the left side of given 2D array matrix,
 *  considering 'O' as path and 'X' as walls
 *  Once we reached the right side of the matrix, and the location is not the pothole,
 *  then we increment valid path count 
 *  
 *  How many hours have I worked on this question?
 *  	About 1 hour, half of the time I was writing test cases, adding optional helper methods,
 *  	writing comments and descriptions
 *  
 *  The challenge of this question for me:
 *  	1. the X and Y coordinate is designed differently in java from the ign code-foo example
 *  	so it took me some time to figure out how to print and store the correct location
 *  	according to ign's requirement
 *  
 *  	2. It's a fairly easy question but the previous challenge made it a little bit trickier
 *  	Also I'm currently having some heavy coursework so I don't really have much time to write
 *  	better test cases. I was thinking about randomly generating a M * N grid with randomly 
 *  	allocated pitholes, but unfortunately I don't have more time for that. However, this 
 *  	should be easy to implement
 *  	However, I'm pretty sure it will work on larger grid
 *
 *  @author: Weilun Yuan
 */

import java.util.*;
import java.lang.*;

// Coor class which represents the location of the point
// specifically used to check if a location has already been visited/seen
class Coor {
	int x;
	int y;
	Coor(int x, int y) {
		this.x = x;
		this.y = y;
	}
	
	// need to define this otherwise the hashset which stores this
	// won't work properly
    public boolean equals(Object o) {
        if (o == this) {
            return true;
        }

        if (!(o instanceof Coor)) {
            return false;
        }

        Coor coor = (Coor) o;

        return Integer.compare(x, coor.x) == 0 && Integer.compare(y, coor.y) == 0;
    }
    
    // for the same reason, we need to override the hashcode function
    @Override
    public int hashCode() {
        int result = 0;
        result = x * 31 * 117 + y * 31 * 130 + 1;
        return result;
    }
}

// The idea of defining this class:
//     When I created this class, I imagine there's a person who
//	   is walking on the grid and trying to get to the right side
//     It makes sense to me that a person needs to know the place
//	   he has visited before
class Node {
    int x;
    int y;
    HashSet<Coor> seen;		// it stores the place that has been visited before
    ArrayList<Coor> path;		// this one is not necessary but I used it to print out
    							// and check with examples from code-foo to compare answers
    Node(int x, int y) {
        this.x = x;
        this.y = y;
        this.seen = new HashSet<>();
        this.path = new ArrayList<>();
    }
    
    // specifically, the parameter "node" represents the next move
    // the next move will inherit the "seen" and "path" list from last move
    Node(int x, int y, Node node) {
    	this.x = x;
    	this.y = y;
    	this.seen = new HashSet<>();
    	this.path = new ArrayList<>();
    	if (node.path.size() != 0) {
    		for (Coor path : node.path) {
    			this.path.add(path);
    		}
    	} else {
    		this.path.add(new Coor(node.y, node.x));
    	}
    	
    	if (node.seen.size() != 0) {
    		for (Coor seen : node.seen) {
    			this.seen.add(seen);
    		}
    	} else {
    		this.seen.add(new Coor(node.y, node.x));
    	}
    }
}

public class ignFindPath
{  
	public static int count = 0;
	public static ArrayList<ArrayList<Node>> answer = new ArrayList<>();
	public static final int start_X = 0;
    public static void main(String args[])
    {
    	// test case from website
        char[][] matrix = {
            {'O', 'X', 'O', 'X'},
            {'O', 'O', 'X', 'O'},
            {'X', 'O', 'O', 'O'},
            {'O', 'O', 'O', 'O'}
        };
        
    	// larger grid test
    	// returned correct answer 2 and also printed out the path
//        char[][] matrix = {
//                {'O', 'X', 'O', 'X', 'X'},
//                {'O', 'O', 'X', 'O', 'X'},
//                {'X', 'O', 'O', 'O', 'O'},
//                {'O', 'X', 'X', 'O', 'O'},
//                {'O', 'O', 'O', 'O', 'X'}
//        };

        // lane blocked test
//        char[][] matrix = {
//                {'O', 'X', 'O', 'X', 'X'},
//                {'O', 'O', 'X', 'O', 'X'},
//                {'X', 'O', 'O', 'O', 'X'},
//                {'O', 'X', 'X', 'O', 'X'},
//                {'O', 'O', 'O', 'O', 'X'}
//        };
        
        // M * N test
//        char[][] matrix = {
//                {'O', 'X', 'O', 'X', 'X'},
//                {'O', 'O', 'X', 'O', 'X'},
//                {'X', 'O', 'O', 'O', 'O'},
//                {'O', 'X', 'X', 'O', 'O'},
//        };
    	
    	// base case: nothing in matrix
//        char[][] matrix = {
//        };
        
        // base case: 1 element in matrix and is valid
//        char[][] matrix = {
//        		{'O'}
//        };
        
        // base case: 1 element in matrix and is not valid
//        char[][] matrix = {
//        		{'X'}
//        };

        findPath(matrix);
    }
    
    public static void findPath(char[][] matrix) {
    	// base case: if a matrix has nothing or invalid length
    	if (matrix.length == 0 || matrix[0].length == 0) {
    		System.out.println("matrix is not valid, no valid path can be detected");
    		return;
    	}
    	
    	// base case: if a matrix only has one element
    	if (matrix.length == 1 && matrix[0].length == 1) {
    		if (matrix[0][0] == 'X') {
    			System.out.println("Matrix only has one location, and it's a pithole. No valid path.");
    		} else {
    			System.out.println("Matrix only has one location, and it's a not. We have one valid path.");
    		}
    		return;
    	}
    	// check if a lane is blocked
		if (checkLaneBlocked(matrix) == true) {
			return;
		};
    	
    	// randomly select a starting point
        Random ran = new Random();
        int randomStart_Y = ran.nextInt(matrix.length);
        
        // check if the previous generated starting point is a pothole
        // if so, regenerate a random number from 0 to (matrix.length - 1)
        while (checkTrap(matrix, matrix.length - 1 - randomStart_Y, start_X)== false) {
            randomStart_Y = ran.nextInt(matrix.length);
        }
        
        System.out.println("random starting location is: (" + start_X + ", "+ randomStart_Y + ")");
        List<Node> queue = new ArrayList<Node>();
        
        Node start = new Node (0, matrix.length - 1 - randomStart_Y);
        queue.add(start);
        
        while(!queue.isEmpty()) {
            Node current = queue.remove(0);
            if(current.x == matrix[0].length - 1) {
            	for (int i = 0; i < current.path.size(); i++) {
            		System.out.print("(" + current.path.get(i).y + ", " + (matrix.length - 1 - current.path.get(i).x) + ") -> ");
            	}
            	System.out.print("(" + current.x + ", " + (matrix.length - 1 - current.y) + ")");
            	System.out.println();
                count++;
            } else {
                current.seen.add(new Coor(current.y, current.x)); // mark as visited
                current.path.add(new Coor(current.y, current.x)); // add it to the path
                
                List<Node> neighbors = getNeighbors(matrix, current);

                queue.addAll(neighbors);
            }
        }
        System.out.println("final answer is: " + count);
    }
    
    // this is the helper method to get the current location's next valid moves
    public static List<Node> getNeighbors(char[][] matrix, Node node) {
        List<Node> neighbors = new ArrayList<Node>();
        
        // move up
        if(isValidPoint(matrix, node.y + 1, node.x, node.seen)) {
//        	System.out.println("1rd node.y is:" + (node.y + 1));
//        	System.out.println("1rd node.x is:" + node.x);
            neighbors.add(new Node(node.x, node.y + 1, node));
        } else {
//        	System.out.println("Not valid...............................");
//        	System.out.println("1rd node.y is:" + (node.y + 1));
//        	System.out.println("1rd node.x is:" + node.x);
        }
        
        // move right
        if(isValidPoint(matrix, node.y , node.x + 1, node.seen)) {
//        	System.out.println("2rd node.y is:" + node.y);
//        	System.out.println("2rd node.x is:" + (node.x + 1));
            neighbors.add(new Node(node.x + 1, node.y, node));
        } else {
//        	System.out.println("Not valid...............................");
//        	System.out.println("2rd node.y is:" + node.y);
//        	System.out.println("2rd node.x is:" + (node.x + 1));
        }
        
        // move down
        if(isValidPoint(matrix, node.y - 1, node.x, node.seen)) {
//        	System.out.println("4rd node.y is:" + (node.y - 1));
//        	System.out.println("4rd node.x is:" + node.x);
            neighbors.add(new Node(node.x, node.y - 1, node));
        } else {
//        	System.out.println("Not valid...............................");
//        	System.out.println("4rd node.y is:" + (node.y - 1));
//        	System.out.println("4rd node.x is:" + node.x);
        }
        
        return neighbors;
    }
    
    // this is the method to find next valid moves
    public static boolean isValidPoint(char[][] matrix, int y, int x, HashSet<Coor> seen) {
    	// TODO Auto-generated method stub
        return !(x < 0 || x >= matrix[0].length || y < 0 || y >= matrix.length) && (!seen.contains(new Coor(y, x)) && matrix[y][x] != 'X');
    }
    
    // this is the method to check if a starting point is X
	private static boolean checkTrap(char[][] matrix, int y, int x) {
		// TODO Auto-generated method stub
		if (matrix[y][x] == 'X') {
			return false;
		} else {
			return true;
		}
	}
	
	// this is the method to check if a column is all 'X'
	private static boolean checkLaneBlocked(char[][] matrix) {
		// TODO Auto-generated method stub
		for (int y = 0; y< matrix[0].length; y++ ) {
			for (int x = 0; x < matrix.length; x++) {
        		if (matrix[x][y] == 'O') {
        			break;
        		} 
        		if (x == matrix.length -1) {
        			System.out.println("road is blocked, the current col number is: " + x);
        			return true;
        		}
        	}
        }
		return false;
	}
}