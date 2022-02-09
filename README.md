
## 1) Use and understand Git:

I have used Git as the Version Control system for this project and I understood what the various git commands do. The following commands are the ones that I used the most while working on the project.

1) <b>`git add <FILES_HERE>`</b>: I used this command to add untracked files by git to the staging area.

2) <b>`git commit -m <MESSAGE_HERE>`</b>: I used this command to commit the files that are currently in the git staging area.

3) <b>`git fetch`</b>: As I was setting up the CD pipeline through github, the commits that I made from there weren't accessible in my local/working repository, unless I run this command to see if there are any changes made to the remote repository.

4) <b>`git stash create <MESSAGE_HERE>`</b>: I used this command to stash my changes in the local repository before pulling the changes that I made from github, as git doesn't allow pulling some changes from remote repository unless the current working repository is clean and have no uncommited changes.

5) <b>`git pull --rebase`</b>: I used this command to pull the changes from the remote repository. There are two ways to pull the changes from remote origin, one is to merge and the other is to rebase. Rebasing carries out the pull operation without creating a separate merge commit, whereas Merging creates a commit for merge. I like to keep my change history clean from merge commits therefore I use the `--rebase` flag when pulling remote changes.

## 2) UML Diagrams:
1) <b>Class Diagram</b>:
   ![Class Diagram](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/5dc55ed59781af26db62a7cf435d7c0977496cbd/images/uml-digrams/class-diagram.png)

2) <b>Sequence Diagram</b>:
   ![Sequence Diagram](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/5dc55ed59781af26db62a7cf435d7c0977496cbd/images/uml-digrams/sequence-diagram.png)
3) <b>State Diagram</b>:
   ![State Diagram](https://github.com/osama-a-rehman/minimalist-chess-ai/blob/5dc55ed59781af26db62a7cf435d7c0977496cbd/images/uml-digrams/state-diagram.png)
   
## 5) Clean Code Development:
In order to write Clean Code, generally I keep in mind `SOLID` principles put forward by <b>Robert C. Martin</b>, `DRY` principle which means "Don't repeat yourself" and `KISS` meaning "Keep it super simple". To be specific, I use following Cheatsheet to make sure that the code I have written is Clean Code.

Moreover, the following points show how the code I've written as part of this project is Clean Code.
1) <b></b>

## 8) Continous Delivery:

The Continous Delivery pipeline can be found here <LINK_HERE>. The CD pipeline runs when a push or pull request is made to the "main" branch. It then carries out the following steps:

1) <b>Set up JDK 11</b>: Setup the ubuntu-20 machine with JDK 11, node.js and npm installed in it.

2) <b>Setup Project</b>: It initializes the project by running the initialize goal of maven which cleans the npm cache, and run npm install so that all the dependencies of the project are available for building it.

3)  <b>Build Project</b>: It runs the compile phase of maven, and the npm plugin attached on this phase in turn runs the command for building the angular project.

4) <b>Test Project</b>: It runs the test phase of maven, the built project in the previous stage is tested in this stage.

5) <b>Package production build for deployment</b>: It runs the package phase of maven, if the previous stage of the CD pipeline passes, then in this stage, the production build of the project is created without running the tests by passing the -DskipTests argument in the maven command (as the tests have already passed in the previous stage, therefore running tests again aren't necessary).

6) <b>Deploy Project</b>:



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
