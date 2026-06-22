
# SOFTWARE DESIGN DOCUMENT: ALGORITHM WORKFLOWS

**Project:** European Elite League (EEL) Football Club & Player Management  
**Design Approach:** Computational Thinking (Algorithms) & HashMap Data Structure

---

# 1. Load Clubs From File

### Input

- `clubs.txt` file path
    

### Output

- Populated Club HashMap (`Map<String, Club>`)
    
- Success or failure message
    

### Algorithm

1. Initialize or clear the Club HashMap.
    
2. Check whether the file exists.
    
3. Open the file and read data line by line.
    
4. Split each line into:
    
    - Club ID
        
    - Club Name
        
    - Sponsor Brand
        
    - Budget
        
5. Validate the extracted data.
    
6. Create a Club object.
    
7. Store the Club object into the HashMap using Club ID as the key.
    
8. Close the file.
    
9. Display a success message.
    

---

# 2. Add New Club

### Input

- Club ID
    
- Club Name
    
- Sponsor Brand
    
- Budget
    

### Output

- New Club added into HashMap
    
- Success or error message
    

### Algorithm

1. Input Club ID.
    
2. Validate Club ID format.
    
3. Check whether the Club ID already exists.
    
4. If duplicated, display an error message and stop.
    
5. Input Club Name.
    
6. Input Sponsor Brand.
    
7. Input Budget.
    
8. Validate Budget.
    
9. Create a Club object.
    
10. Insert the object into the Club HashMap.
    
11. Display a success message.
    

---

# 3. Search Club By ID

### Input

- Club ID
    

### Output

- Club information or not-found message
    

### Algorithm

1. Input Club ID.
    
2. Check whether the Club ID exists in the HashMap.
    
3. If not found, display an error message.
    
4. Retrieve the Club object using the Club ID.
    
5. Format the club information.
    
6. Display the result.
    

---

# 4. Update Club Information

### Input

- Club ID
    
- New Name
    
- New Sponsor
    
- New Budget
    

### Output

- Updated Club information
    

### Algorithm

1. Input Club ID.
    
2. Check whether the club exists.
    
3. Retrieve the Club object.
    
4. Input a new Club Name.
    
5. Update the name if a value is provided.
    
6. Input a new Sponsor Brand.
    
7. Update the sponsor if a value is provided.
    
8. Input a new Budget.
    
9. Validate and update the budget if necessary.
    
10. Display a success message.
    

---

# 5. Search Clubs By Budget

### Input

- Maximum budget
    

### Output

- List of matching clubs
    

### Algorithm

1. Input a maximum budget value.
    
2. Validate the budget.
    
3. Retrieve all Club objects from the HashMap.
    
4. Traverse the collection.
    
5. Compare each club budget with the given value.
    
6. Add matching clubs into a temporary list.
    
7. Display the result list.
    

---

# 6. Save Clubs To File

### Input

- Club HashMap
    
- `clubs.txt` file path
    

### Output

- Data saved into file
    

### Algorithm

1. Open the destination file.
    
2. Retrieve all Club objects.
    
3. Traverse the collection.
    
4. Convert each club into a CSV-formatted string.
    
5. Write the string into the file.
    
6. Close the file.
    
7. Display a success message.
    

---

# 7. Load Players From File

### Input

- `players.txt` file path
    
- Club HashMap
    

### Output

- Player HashMap (`Map<String, Player>`)
    
- Grouping Map (`Map<String, List<Player>>`)
    

### Algorithm

1. Clear existing player data.
    
2. Check whether the file exists.
    
3. Read data line by line.
    
4. Extract:
    
    - Player ID
        
    - Club ID
        
    - Player Name
        
    - Position
        
    - Shirt Number
        
5. Validate Club ID.
    
6. Validate shirt number uniqueness within the club.
    
7. Create a Player object.
    
8. Store it in the Player HashMap.
    
9. Add it into the corresponding list in the Grouping Map.
    
10. Close the file.
    
11. Display a success message.
    

---

# 8. Add New Player

### Input

- Player ID
    
- Club ID
    
- Player Name
    
- Position
    
- Shirt Number
    

### Output

- New Player added into the system
    

### Algorithm

1. Input Player ID.
    
2. Validate Player ID format.
    
3. Check for duplicated Player ID.
    
4. Display available Club IDs.
    
5. Input Club ID.
    
6. Verify the Club ID exists.
    
7. Input Player Name.
    
8. Input Position.
    
9. Validate Position.
    
10. Input Shirt Number.
    
11. Check shirt number uniqueness within the selected club.
    
12. Create a Player object.
    
13. Insert into the Player HashMap.
    
14. Add into the corresponding club list of the Grouping Map.
    
15. Display a success message.
    

---

# 9. Display Players By Position

### Input

- Position
    

### Output

- List of matching players
    

### Algorithm

1. Input a position.
    
2. Validate the position.
    
3. Retrieve all Player objects.
    
4. Traverse the collection.
    
5. Compare each player's position with the target value.
    
6. Add matching players into a temporary list.
    
7. Display the result list.
    

---

# 10. Delete Player By ID

### Input

- Player ID
    

### Output

- Player removed from the system
    

### Algorithm

1. Input Player ID.
    
2. Check whether the Player ID exists.
    
3. Retrieve the Player object.
    
4. Obtain the associated Club ID.
    
5. Remove the player from the Player HashMap.
    
6. Access the corresponding list in the Grouping Map.
    
7. Remove the player from the list.
    
8. Display a success message.
    

---

# 11. Search Player By Name

### Input

- Partial player name
    

### Output

- List of matching players
    

### Algorithm

1. Input a search keyword.
    
2. Convert the keyword to lowercase.
    
3. Retrieve all Player objects.
    
4. Traverse the collection.
    
5. Compare the keyword with each player's name.
    
6. Add matching players into a temporary list.
    
7. Display the result list.
    

---

# 12. Display Players Sorted By Club Name Then Shirt Number

### Input

- Player HashMap
    
- Club HashMap
    

### Output

- Sorted player list
    

### Algorithm

1. Retrieve all Player objects into a List.
    
2. Create a Comparator.
    
3. Retrieve Club IDs of two compared players.
    
4. Obtain Club Names from the Club HashMap.
    
5. Compare Club Names in ascending order.
    
6. If Club Names are equal, compare Shirt Numbers.
    
7. Sort the list.
    
8. Display the sorted result.
    

---

# 13. Save Players To File

### Input

- Player HashMap
    
- `players.txt` file path
    

### Output

- Data saved into file
    

### Algorithm

1. Open the destination file.
    
2. Retrieve all Player objects.
    
3. Traverse the collection.
    
4. Convert each player into a CSV-formatted string.
    
5. Write the string into the file.
    
6. Close the file.
    
7. Display a success message.
    

---

# 14. Save And Exit

### Input

- Modification flag
    

### Output

- Data saved and application terminated
    

### Algorithm

1. Check the modification flag.
    
2. If data has changed, save club data.
    
3. If data has changed, save player data.
    
4. Display an exit message.
    
5. Terminate the application.