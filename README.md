# Advanced Software Engineering
This is my project "Minimalist Chess AI" as submission for the Advanced Software Engineering course. This README explains the usage of 11 different Software Engineering concepts or tools as taught in class in this project.

## 1) Use and understand Git:

I have used Git as the Version Control system for this project and I understood what the various git commands do. The following commands are the ones that I used the most while working on the project.

1) <b>`git add <FILES_HERE>`</b>: I used this command to add untracked files by git to the staging area.

2) <b>`git commit -m <MESSAGE_HERE>`</b>: I used this command to commit the files that are currently in the git staging area.

3) <b>`git fetch`</b>: As I was setting up the CD pipeline through github, the commits that I made from there weren't accessible in my local/working repository, unless I run this command to see if there are any changes made to the remote repository.

4) <b>`git stash create <MESSAGE_HERE>`</b>: I used this command to stash my changes in the local repository before pulling the changes that I made from github, as git doesn't allow pulling some changes from remote repository unless the current working repository is clean and have no uncommited changes.

5) <b>`git pull --rebase`</b>: I used this command to pull the changes from the remote repository. There are two ways to pull the changes from remote origin, one is to merge and the other is to rebase. Rebasing carries out the pull operation without creating a separate merge commit, whereas Merging creates a commit for merge. I like to keep my change history clean from merge commits therefore I use the `--rebase` flag when pulling remote changes.

## 2) UML Diagrams:
1) <b>Class Diagram</b>: A UML Class diagram is a type of static structure diagram that describes the structure of a system by showing the system's classes, their attributes, operations (or methods), and the relationships among objects. The following graphic shows the UML Class Diagram of Minimalist Chess AI project.
   ![Class Diagram](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/5dc55ed59781af26db62a7cf435d7c0977496cbd/images/uml-digrams/class-diagram.png)

2) <b>Sequence Diagram</b>: A UML Sequence diagram shows object interactions arranged in time sequence. It depicts the objects involved in the scenario and the sequence of messages exchanged between the objects needed to carry out the functionality of scenario. The following graphic shows the UML Sequence Diagram of Minimalist Chess AI project.
   ![Sequence Diagram](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/5dc55ed59781af26db62a7cf435d7c0977496cbd/images/uml-digrams/sequence-diagram.png)

3) <b>State Diagram</b>: A UML State diagram is a diagram used in computer science to describe the behavior of a system considering all the possible states of an object when an event occurs. The following graphic shows the UML State Diagram of Minimalist Chess AI project.
 ![State Diagram](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/5dc55ed59781af26db62a7cf435d7c0977496cbd/images/uml-digrams/state-diagram.png)

## 3) Domain Driven Design:

<b>Domains</b>:
I identified the following domains in the "Minimalist Chess AI" project:
1) <b>Chess Board</b>: The Chess board itself can be identified as a domain. It involves having a board, chess piece and well defined moves that the chess pieces could make. The implementation of this domain is taken from a [Chess Library](https://www.npmjs.com/package/chess.js), and is used as `gameClient` in the project.
2) <b>Chess Engine</b>: The Chess English could be identified as a domain. It involves analyzing the chess position, assessing or evaluating it, and computing the best move for a player. The implementation fo this domain can be found in [ai.utils.ts](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/main/src/main/java/minimalist-chess-ai/src/app/board/utils/ai.util.ts).
3) <b>Game Analysis</b>: A Chess game's analysis could be taken as a domain as well. The AI that plays against a human could be used to analyze a game and give suggestions about what particular line could have given advantage to a player in an already played game, or it could be used to prepare as well.
4) <b>Time Control</b>: Time control could be taken as another domain, to have different time controls available so that human could play against an AI in different time controls.
5) <b>Chess Variants</b>: This domain can be added to the project, to integrate AI with the chess variants like Chess960.

<b>Strategic Design:</b>
As the project consists of the AI giving the best move for AI which might take arbitrary time to compute, I decided to go with the "Published Language" strategic design. 

It involves having a [Worker/Socket](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/main/src/main/java/minimalist-chess-ai/src/app/board/worker/ai.worker.ts) that acts as a socket layer between the "Chess board" and the "Chess Engine". It creates a socket/event listener that listens for the "Move Request Event" from the chess board for a particular position. Once it receives a message from the "Chess board", it delegates the chess position received via `fen` key in the message to the Ai Utility that actually goes on to compute the best move in that position. Once the Ai is done computing the best move, the Worker/Socket sends a message back to its sender with the Best move's Notation e.g. `Qh4` that the "Chess Board" requested in the previous message.

## 4) Metrics:
I used SonarQube as the Code Quality analyzer for this project. The following are the most interesting metrics that helped me improve code quality:

1) <b>Code smell</b>: Sonarqube highlighted 7 code smells in the code due to commented code and unused imports as shown in the figure below. I removed these code smells from the code afterwards.

![Code Smell](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/2b4a08e1bd15a0f89240ad58132ef70c66161d29/images/metrics/code-smell.png)

2) <b>Complexity</b>: I analyzed the function that calculates the best move for AI i.e.[AIUtil#calculateBestMove()](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/0d404c368e846230fb2cb8b448d33429a8d41c77/src/main/java/minimalist-chess-ai/src/app/board/utils/ai.util.ts#L6) for code complexity and Sonarqube reported the Cyclomatic Complexity of `17` and Cognitive Complexity of `23` as shown in the figure below.

![Code Complexity](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/2b4a08e1bd15a0f89240ad58132ef70c66161d29/images/metrics/code-complexity.png)

3) <b>Duplication</b>: Sonarqube analyzed the code for duplication and found no duplications in code as shown below.

![Code Duplication](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/2b4a08e1bd15a0f89240ad58132ef70c66161d29/images/metrics/code-duplication.png)

4) <b>Size</b>: Another interesting metric is the size of the project. As the following figure shows, the project has `631` lines of code divided into `26` files. There are `16` classes in the project and `32` functions. The comments span `2.9%` of the lines of code in the project.

![Code Size](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/2b4a08e1bd15a0f89240ad58132ef70c66161d29/images/metrics/code-size.png)


## 5) Clean Code Development:
In order to write Clean Code, generally I keep in mind `SOLID` principles put forward by <b>Robert C. Martin</b>, `DRY` principle which means "Don't repeat yourself" and `KISS` meaning "Keep it super simple". To be specific, I use following Cheatsheet to make sure that the code I have written is Clean Code.
[Clean Code  Development - Cheat sheet](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/0fc15c2862bcd43a8cc372847ca7f46dd824658b/images/clean-code/Clean%20Code%20Development%20-%20Cheat%20Sheet.pdf)

Moreover, the following points show how the code I've written as part of this project is Clean Code according to the rules mentioned in the above provided Cheat Sheet:
1) <b>General Rules</b>: I've followed KISS (Keep it Super Simple) rule by keeping simplistic functions that do only one thing like the functions in [ai.util.ts]() and [board.util.ts](). I also followed DRY (Don't repeat yourself) rule as Sonarqube shows that there are 0% duplications in the project.
2) <b>Function Rules</b>: I've written relatively small function that have single responsibility, e.g. have a look at functions in [ai.util.ts]() and [board.util.ts]().
3) <b>Error Handling</b>: I've written functions that throw errors when error occurs and the error handling is kept separate from the business code. E.g. have a look at these functions:
4) <b>Testing</b>: I've kept only one assertion per test as the cheat sheet suggests. Also, I've tried to keep test code as clean as the production code itself. The tests can be found here: [ai.util.spec.ts]() and [board.util.spec.ts]().
5) <b>Code Readability</b>: I've used similar coding style all over the project. Also, as the cheat sheet says, dedicated types should be preferred over primitive data types. That's why, I've used dedicated data types for Board, Piece, File, Ranks, etc. that can be found here.

## 6) Build Management:
I used `Maven` as the build management tool for the project. To interact with the npm project, I used the maven plugin [exec-maven-plugin](https://www.mojohaus.org/exec-maven-plugin/usage.html) by MojoHaus. The plugin provides hooks around maven phases/goals. These hooks can be used to perform npm specific operations, e.g. build project, run tests, generate code-coverage reports, etc. when a particular phase or goal of maven is executed.

The [pom.xml](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/main/pom.xml) can be found here.

The following points are important for explanation about the above pom.xml:
1) The plugin is defined in the pom.xml and is configured [here](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/d19daf410a9ec691f4deb3c6f521cdc6a8af3555/pom.xml#L138) by setting the working directory to where the npm project is kept.
2) When the clean goal of the maven is executed, [here](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/d19daf410a9ec691f4deb3c6f521cdc6a8af3555/pom.xml#L121-L134), the plugin performs the cleaning of the npm project by cleaning the npm cache. 
3) When the initialize goal of the maven is executed, [here](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/d19daf410a9ec691f4deb3c6f521cdc6a8af3555/pom.xml#L25-L37), the plugin performs the initialization of the npm project by running npm install so that the project's dependencies could be initialized.
4) When the compile goal of the maven is executed, [here](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/d19daf410a9ec691f4deb3c6f521cdc6a8af3555/pom.xml#L40-L53), the plugin runs the npm command `npm run build` that builds the project for testing.
5) When the test goal of the maven is executed, [here](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/d19daf410a9ec691f4deb3c6f521cdc6a8af3555/pom.xml#L56-L69), the plugin runs the command `npm test --no-watch` that runs the underlying unit tests in the npm project.
6) When the package goal of the maven is executed, [here](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/d19daf410a9ec691f4deb3c6f521cdc6a8af3555/pom.xml#L72-L85), the plugin runs the command `npm run build:prod` that builds the production application ready for deployment.

## 7) Unit testing:
I've written the unit tests for the project in the following files:
1) Ai Utility related tests in: [ai.util.spec.ts](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/135c62c9e10dd3936e93b16cc055dafe734c5f7d/src/main/java/minimalist-chess-ai/src/app/board/utils/ai.util.spec.ts)
2) Board Utility related tests in: [board.util.spec.ts](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/135c62c9e10dd3936e93b16cc055dafe734c5f7d/src/main/java/minimalist-chess-ai/src/app/board/utils/board.util.spec.ts)

## 8) Continous Integration/Continous Delivery:

The CI/CD pipeline can be found here [CI/CD Pipeline](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/681e02da5f9b81c6f5f56b224b063e8283ad22e7/.github/workflows/cd.yml). The CI/CD pipeline runs when a push or pull request is made to the "main" branch. It then carries out the following steps:

1) <b>Set up JDK 11</b>: Setup the ubuntu-20 machine with JDK 11, node.js and npm installed in it.

2) <b>Setup Project</b>: It initializes the project by running the initialize goal of maven which cleans the npm cache, and run npm install so that all the dependencies of the project are available for building it.

3)  <b>Build Project</b>: It runs the compile phase of maven, and the npm plugin attached on this phase in turn runs the command for building the angular project.

4) <b>Test Project</b>: It runs the test phase of maven, the built project in the previous stage is tested in this stage.

5) <b>Package production build for deployment</b>: It runs the package phase of maven, if the previous stage of the CD pipeline passes, then in this stage, the production build of the project is created without running the tests by passing the -DskipTests argument in the maven command (as the tests have already passed in the previous stage, therefore running tests again aren't necessary).

6) <b>Deploy Project</b>: This stage of the pipeline is left unimplemented, but it is intended to deploy the application built for production in the last stage to be deployed on a server.


## 9) IDE Shortcuts:

My favourite IDE is Intellij IDEA and I used it to develop this project. Five of my favourite shortcuts of the IDE and what they do are as follows:

1) <b>Alt+Enter</b>: It's one of the most useful shortcuts of the IDE. This shortcut behaves differently based on the line which has the cursor.
   On the line with an error, pressing Alt+Enter shows the list of suggested fixes for the problem.
   On the line with a warning, pressing Alt+Enter shows the list of suggestions to remove the warning.
   On any other line, pressing Alt+Enter shows us Intention Actions available in the current context, e.g. add static imports in Java when a static resource is accessed on the line.

2) <b>F2</b>: Using F2, you can jump across errors and warning in the current file making it convenient to have a look at errors or warnings in the file instead of navigating across them using the mouse scroll.

3) <b>Shift+Shift</b>: Double pressing the Shift key opens a search box that lets you search for anything across the project. Typing in the search box, you can see results from classes, files, symbols and actions.

4) <b>Shift+F6</b>: Shift+F6 is the shortcut for Rename Refactoring to change names of symbols, files, directories, packages, modules and all the references to them throughout the project.

5) <b>Alt+F7</b>: Pressing Alt+F7 shows the usages of what is under the cursor across the project. For example, pressing Alt+F7 on the interface name, the search window will show all the places that the interface is used whether it’s a field declaration or a class that implements this interface.

## 10) DSL
As it was difficult to create a DSL for my own project, therefore I've created a groovy DSL for a simple calculator with four basic operation `sum`, `subtract`, `multiply`, and `divide`.

The whole DSL project consists of four files:
1) <b>[ICalculator](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/3b6993d4b43c7f7ed6003ce72863d3d8e4c4d907/dsl_calculator/src/com/osama/dsl/calculator/ICalculator.groovy)</b>: An interface that defines the methods of the calculator i.e. `sum`, `subtract`, `multiply`, and `divide`.
2) <b>[CalculatorImpl](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/3b6993d4b43c7f7ed6003ce72863d3d8e4c4d907/dsl_calculator/src/com/osama/dsl/calculator/CalculatorImpl.groovy)</b>: A class that implements the ICalculator interface.
3) <b>[DSLCaller](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/3b6993d4b43c7f7ed6003ce72863d3d8e4c4d907/dsl_calculator/src/com/osama/dsl/DSLCaller.groovy)</b>: DSLCaller is the class that creates the binding between DSL API with the actual calculator methods. For example, it binds the command `sum` with calculator's sum method, and similarly other methods as well. It then creates the groovy shell with the command/method bindings and then evaluate the DSL script `CalculatorConsole.groovy`.
4) <b>[CalculatorConsole](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/3b6993d4b43c7f7ed6003ce72863d3d8e4c4d907/dsl_calculator/src/com/osama/dsl/CalculatorConsole.groovy)</b>: This file contains the actual DSL commands that perform the calculations. It contains four different commands that `sum`, `subtract`, `multiply`, and `divide` two numbers using a simple interface that actually calls the Calculator methods written in groovy to perform the actual calculations.

## 11) Functional Programming
1) <b>Only final data structures</b>: I've used `final` or `readonly` gameClient in the [Board Component](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/0d404c368e846230fb2cb8b448d33429a8d41c77/src/main/java/minimalist-chess-ai/src/app/board/board.component.ts#L15) as it's never reassigned after initial assignment. The other 4 attributes in the project are mutable so they have to be kept non-final.

2) <b>Side effect free functions</b>: All the utility functions are side-effect free i.e. they return the same value with same parameters everytime they are called. The examples of side-effect free functions from the project are: 
   
   a) [AIUtil#calculateBestMove(gameClient, currentMove, depth): string](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/0d404c368e846230fb2cb8b448d33429a8d41c77/src/main/java/minimalist-chess-ai/src/app/board/utils/ai.util.ts#L6): It returns the notated best move for the player whose current move it is, by evaluating the position using minimax algorithm at a certain depth passed as parameters.
  
   b) [AIUtil#minimax(gameClient, depth, alpha, beta, isMaximizing): number](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/0d404c368e846230fb2cb8b448d33429a8d41c77/src/main/java/minimalist-chess-ai/src/app/board/utils/ai.util.ts#L35): It performs the minimax algorithm on the chess position pointed by the game client and tries to minimize or maximize the evaluation and choose the best move accordingly. 
   
   c) [AIUtil#evaluateBoard(gameClient, currentMove): number](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/0d404c368e846230fb2cb8b448d33429a8d41c77/src/main/java/minimalist-chess-ai/src/app/board/utils/ai.util.ts#L78): It returns the chess position's evaluation pointed by the game client.
   
   d) [BoardUtil#getBoardFromGameClient(gameClient: any): Board](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/0d404c368e846230fb2cb8b448d33429a8d41c77/src/main/java/minimalist-chess-ai/src/app/board/utils/board.util.ts#L14): It returns the board data type i.e. `Piece[][]` by mapping the chess position from the game client to this data type. It is used to show chess pieces and the board on the website's frontend.

   The functions in the [BoardComponent](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/0d404c368e846230fb2cb8b448d33429a8d41c77/src/main/java/minimalist-chess-ai/src/app/board/board.component.ts) are not side-effect free as they are used to mutate game state of the BoardComponent class.

3) <b>The use of higher-order functions</b>: I used a higher order function [getMiniMaxFn(isMaximizing: boolean): fn](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/3710022f50b3aa2e8acdcac80c415c2479194cf5/src/main/java/minimalist-chess-ai/src/app/board/utils/ai.util.ts#L100) that returns either `Math.min` or `Math.max` function based on whether the minimax algorithm is maximizing or minizing the value. Its usage can be found here: [getMiniMaxFn()'s usage](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/3710022f50b3aa2e8acdcac80c415c2479194cf5/src/main/java/minimalist-chess-ai/src/app/board/utils/ai.util.ts#L50)

4) <b>Functions as parameters and return values</b>: All of the utility functions follow this approach they take parameters and based on the parameters, return the consistent value. These function can be found in [AiUtil](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/main/src/main/java/minimalist-chess-ai/src/app/board/utils/ai.util.ts#L50) and [BoardUtil](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/main/src/main/java/minimalist-chess-ai/src/app/board/utils/board.util.ts) classes.

5) <b>Use closures or anonymous functions</b>: I used closures on two places in the project. 

   a) Firstly, I used a closure [here](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/3710022f50b3aa2e8acdcac80c415c2479194cf5/src/main/java/minimalist-chess-ai/src/app/board/board.component.ts#L75) to map the valid moves in a particular position to starting and ending squares so that these squares can be highlighted on the board for user's assistance.
   
   b) Secondly, I used a closure [here](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/3710022f50b3aa2e8acdcac80c415c2479194cf5/src/main/java/minimalist-chess-ai/src/app/board/board.component.ts#L87). When the asynchronous evaluation for the best move is done by AI, this closure is called with the best move and this parameter of the closure is used to make the move suggested by AI on the board.
