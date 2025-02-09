# General Guildlines

1. if you can replace using a type asserions (aka: as) then do it

2. strict checking "===" always used unless you got a case which it is easier to just use "=="

3. types should only be in a types only file, only level-1 and level-2 folders has types folder

4. We don't use function types and interfaces unless really necessary

5. Any Model (class) will only have static functions (why?: for serialization and deserialization and copy method, all functions are lost)

# Notes:

1. If you see a scroll view without purpose (scrolling), its because to unfocus an input when clicking outside it (defult behavior of scroll view is this)
