# Builds self contained html version.
# To do:-
#       * Check for yarn, inliner
#       * sed out font dependency

#!/usr/bin/bash
yarn inliner https://imaginary-landscapes.rosshudson.co.uk/play/ \
  | sed -e '1,2d' \
  | sed -e '$ d' \
  > builds/$(date -d "today" +"%Y%m%d%H%M")_imaginary-landscapes.html
