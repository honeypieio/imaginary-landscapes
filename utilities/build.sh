# Builds self contained html version.
# To do:-
#       * Check for yarn, inliner
#       * Silence/sed out terminal output
#       * sed out font dependency

#!/usr/bin/bash
yarn inliner https://imaginary-landscapes.rosshudson.co.uk/play/ > builds/$(date -d "today" +"%Y%m%d%H%M")_imaginary-landscapes.html
