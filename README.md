# zFetch
The homemade alternative to neofetch.

Originally made because the neofetch config files dont accept inverse colors.

# How it works:
zfetch is made using ``node.js``, and as such it uses various modules to obtain your system's data, such as ``systeminformation``, ``os``, and more.

# How to install:
Grab the ``installer.sh`` file and create an empty folder where you want the code to be. Then, execute the bash script, and everything will get ✨⭐ magically ⭐✨ installed. 

# How to use:
First of all, go to your
``.bashrc`` file and add:
```bash
alias zfetch="node path/to/index/file"
```
Then, restart your terminal. If done correctly, your should be able to type ``zfetch`` and the zfetch menu should pop up.

After the initial use, you should see config files in ``.config/zfetch``, namely ``zfetch.conf``.

In ``zfetch.conf``, you can edit properties of zfetch to your liking, as the display logo, the color, or even provide a different os-release file to get information from.
