// Title|Year|Director|Stars (semicolon-separated)|tier (1 = well known, 2 = deeper cut)
const RAW = `
The Godfather|1972|Francis Ford Coppola|Marlon Brando;Al Pacino|1
The Godfather Part II|1974|Francis Ford Coppola|Al Pacino;Robert De Niro|2
Apocalypse Now|1979|Francis Ford Coppola|Martin Sheen;Marlon Brando|2
Titanic|1997|James Cameron|Leonardo DiCaprio;Kate Winslet|1
Avatar|2009|James Cameron|Sam Worthington;Zoe Saldaña|1
The Terminator|1984|James Cameron|Arnold Schwarzenegger;Linda Hamilton|1
Terminator 2: Judgment Day|1991|James Cameron|Arnold Schwarzenegger;Linda Hamilton|1
Jurassic Park|1993|Steven Spielberg|Sam Neill;Laura Dern;Jeff Goldblum|1
Jaws|1975|Steven Spielberg|Roy Scheider;Robert Shaw|1
Raiders of the Lost Ark|1981|Steven Spielberg|Harrison Ford;Karen Allen|1
E.T. the Extra-Terrestrial|1982|Steven Spielberg|Henry Thomas;Drew Barrymore|1
Schindler's List|1993|Steven Spielberg|Liam Neeson;Ralph Fiennes|1
Saving Private Ryan|1998|Steven Spielberg|Tom Hanks;Matt Damon|1
Catch Me If You Can|2002|Steven Spielberg|Leonardo DiCaprio;Tom Hanks|1
Minority Report|2002|Steven Spielberg|Tom Cruise;Colin Farrell|2
Close Encounters of the Third Kind|1977|Steven Spielberg|Richard Dreyfuss;Teri Garr|2
The Dark Knight|2008|Christopher Nolan|Christian Bale;Heath Ledger|1
Inception|2010|Christopher Nolan|Leonardo DiCaprio;Joseph Gordon-Levitt|1
Interstellar|2014|Christopher Nolan|Matthew McConaughey;Anne Hathaway|1
Oppenheimer|2023|Christopher Nolan|Cillian Murphy;Emily Blunt|1
Memento|2000|Christopher Nolan|Guy Pearce;Carrie-Anne Moss|2
Forrest Gump|1994|Robert Zemeckis|Tom Hanks;Robin Wright|1
Back to the Future|1985|Robert Zemeckis|Michael J. Fox;Christopher Lloyd|1
Cast Away|2000|Robert Zemeckis|Tom Hanks;Helen Hunt|1
Pulp Fiction|1994|Quentin Tarantino|John Travolta;Samuel L. Jackson;Uma Thurman|1
Kill Bill: Vol. 1|2003|Quentin Tarantino|Uma Thurman;Lucy Liu|1
Django Unchained|2012|Quentin Tarantino|Jamie Foxx;Christoph Waltz;Leonardo DiCaprio|1
Inglourious Basterds|2009|Quentin Tarantino|Brad Pitt;Christoph Waltz;Mélanie Laurent|1
Once Upon a Time in Hollywood|2019|Quentin Tarantino|Leonardo DiCaprio;Brad Pitt;Margot Robbie|1
Reservoir Dogs|1992|Quentin Tarantino|Harvey Keitel;Tim Roth;Steve Buscemi|2
The Matrix|1999|Lana & Lilly Wachowski|Keanu Reeves;Carrie-Anne Moss|1
Gladiator|2000|Ridley Scott|Russell Crowe;Joaquin Phoenix|1
Alien|1979|Ridley Scott|Sigourney Weaver;Tom Skerritt|1
Blade Runner|1982|Ridley Scott|Harrison Ford;Rutger Hauer|2
Thelma & Louise|1991|Ridley Scott|Susan Sarandon;Geena Davis|2
The Martian|2015|Ridley Scott|Matt Damon;Jessica Chastain|1
The Shawshank Redemption|1994|Frank Darabont|Tim Robbins;Morgan Freeman|1
The Green Mile|1999|Frank Darabont|Tom Hanks;Michael Clarke Duncan|1
Star Wars|1977|George Lucas|Mark Hamill;Harrison Ford;Carrie Fisher|1
The Silence of the Lambs|1991|Jonathan Demme|Jodie Foster;Anthony Hopkins|1
Philadelphia|1993|Jonathan Demme|Tom Hanks;Denzel Washington|2
Fight Club|1999|David Fincher|Brad Pitt;Edward Norton|1
Se7en|1995|David Fincher|Brad Pitt;Morgan Freeman|1
The Social Network|2010|David Fincher|Jesse Eisenberg;Andrew Garfield|1
Gone Girl|2014|David Fincher|Ben Affleck;Rosamund Pike|1
Goodfellas|1990|Martin Scorsese|Ray Liotta;Robert De Niro;Joe Pesci|1
The Wolf of Wall Street|2013|Martin Scorsese|Leonardo DiCaprio;Jonah Hill|1
The Departed|2006|Martin Scorsese|Leonardo DiCaprio;Matt Damon;Jack Nicholson|1
Taxi Driver|1976|Martin Scorsese|Robert De Niro;Jodie Foster|2
Raging Bull|1980|Martin Scorsese|Robert De Niro;Cathy Moriarty|2
Shutter Island|2010|Martin Scorsese|Leonardo DiCaprio;Mark Ruffalo|1
Top Gun|1986|Tony Scott|Tom Cruise;Kelly McGillis|1
Top Gun: Maverick|2022|Joseph Kosinski|Tom Cruise;Miles Teller|1
Pretty Woman|1990|Garry Marshall|Julia Roberts;Richard Gere|1
The Lord of the Rings: The Fellowship of the Ring|2001|Peter Jackson|Elijah Wood;Ian McKellen|1
Harry Potter and the Sorcerer's Stone|2001|Chris Columbus|Daniel Radcliffe;Emma Watson|1
Home Alone|1990|Chris Columbus|Macaulay Culkin;Joe Pesci|1
Mrs. Doubtfire|1993|Chris Columbus|Robin Williams;Sally Field|1
Black Panther|2018|Ryan Coogler|Chadwick Boseman;Michael B. Jordan|1
Creed|2015|Ryan Coogler|Michael B. Jordan;Sylvester Stallone|1
Barbie|2023|Greta Gerwig|Margot Robbie;Ryan Gosling|1
Lady Bird|2017|Greta Gerwig|Saoirse Ronan;Laurie Metcalf|2
Little Women|2019|Greta Gerwig|Saoirse Ronan;Florence Pugh|2
La La Land|2016|Damien Chazelle|Ryan Gosling;Emma Stone|1
Whiplash|2014|Damien Chazelle|Miles Teller;J.K. Simmons|1
Mad Max: Fury Road|2015|George Miller|Tom Hardy;Charlize Theron|1
Get Out|2017|Jordan Peele|Daniel Kaluuya;Allison Williams|1
Parasite|2019|Bong Joon Ho|Song Kang-ho;Choi Woo-shik|1
Toy Story|1995|John Lasseter|Tom Hanks;Tim Allen|1
The Lion King|1994|Roger Allers & Rob Minkoff|Matthew Broderick;James Earl Jones|1
Frozen|2013|Chris Buck & Jennifer Lee|Kristen Bell;Idina Menzel|1
Finding Nemo|2003|Andrew Stanton|Albert Brooks;Ellen DeGeneres|1
Up|2009|Pete Docter|Ed Asner;Jordan Nagai|1
Inside Out|2015|Pete Docter|Amy Poehler;Phyllis Smith|1
The Incredibles|2004|Brad Bird|Craig T. Nelson;Holly Hunter|1
Ratatouille|2007|Brad Bird|Patton Oswalt;Lou Romano|2
Shrek|2001|Andrew Adamson & Vicky Jenson|Mike Myers;Eddie Murphy|1
Aladdin|1992|Ron Clements & John Musker|Scott Weinger;Robin Williams|1
The Little Mermaid|1989|Ron Clements & John Musker|Jodi Benson;Pat Carroll|2
Moana|2016|Ron Clements & John Musker|Auliʻi Cravalho;Dwayne Johnson|1
Spirited Away|2001|Hayao Miyazaki||2
Ghostbusters|1984|Ivan Reitman|Bill Murray;Dan Aykroyd|1
Die Hard|1988|John McTiernan|Bruce Willis;Alan Rickman|1
Predator|1987|John McTiernan|Arnold Schwarzenegger;Carl Weathers|2
Rocky|1976|John G. Avildsen|Sylvester Stallone;Talia Shire|1
The Sixth Sense|1999|M. Night Shyamalan|Bruce Willis;Haley Joel Osment|1
Mean Girls|2004|Mark Waters|Lindsay Lohan;Rachel McAdams|1
The Devil Wears Prada|2006|David Frankel|Meryl Streep;Anne Hathaway|1
Erin Brockovich|2000|Steven Soderbergh|Julia Roberts;Albert Finney|2
Ocean's Eleven|2001|Steven Soderbergh|George Clooney;Brad Pitt|1
Good Will Hunting|1997|Gus Van Sant|Matt Damon;Robin Williams|1
Avengers: Endgame|2019|Anthony & Joe Russo|Robert Downey Jr.;Chris Evans|1
Iron Man|2008|Jon Favreau|Robert Downey Jr.;Gwyneth Paltrow|1
Elf|2003|Jon Favreau|Will Ferrell;Zooey Deschanel|1
Wonder Woman|2017|Patty Jenkins|Gal Gadot;Chris Pine|1
Everything Everywhere All at Once|2022|Daniel Kwan & Daniel Scheinert|Michelle Yeoh;Ke Huy Quan|1
Dune|2021|Denis Villeneuve|Timothée Chalamet;Rebecca Ferguson|1
Arrival|2016|Denis Villeneuve|Amy Adams;Jeremy Renner|2
Ferris Bueller's Day Off|1986|John Hughes|Matthew Broderick;Mia Sara|1
The Breakfast Club|1985|John Hughes|Molly Ringwald;Emilio Estevez;Judd Nelson|1
Dirty Dancing|1987|Emile Ardolino|Patrick Swayze;Jennifer Grey|1
Grease|1978|Randal Kleiser|John Travolta;Olivia Newton-John|1
The Notebook|2004|Nick Cassavetes|Ryan Gosling;Rachel McAdams|1
Legally Blonde|2001|Robert Luketic|Reese Witherspoon;Luke Wilson|1
Pirates of the Caribbean: The Curse of the Black Pearl|2003|Gore Verbinski|Johnny Depp;Orlando Bloom;Keira Knightley|1
Edward Scissorhands|1990|Tim Burton|Johnny Depp;Winona Ryder|1
Beetlejuice|1988|Tim Burton|Michael Keaton;Winona Ryder|1
Batman|1989|Tim Burton|Michael Keaton;Jack Nicholson|1
Casablanca|1942|Michael Curtiz|Humphrey Bogart;Ingrid Bergman|2
The Wizard of Oz|1939|Victor Fleming|Judy Garland;Ray Bolger|1
Gone with the Wind|1939|Victor Fleming|Vivien Leigh;Clark Gable|2
Psycho|1960|Alfred Hitchcock|Anthony Perkins;Janet Leigh|1
Rear Window|1954|Alfred Hitchcock|James Stewart;Grace Kelly|2
Vertigo|1958|Alfred Hitchcock|James Stewart;Kim Novak|2
North by Northwest|1959|Alfred Hitchcock|Cary Grant;Eva Marie Saint|2
The Birds|1963|Alfred Hitchcock|Tippi Hedren;Rod Taylor|2
The Sound of Music|1965|Robert Wise|Julie Andrews;Christopher Plummer|1
West Side Story|1961|Robert Wise & Jerome Robbins|Natalie Wood;Richard Beymer|2
Mary Poppins|1964|Robert Stevenson|Julie Andrews;Dick Van Dyke|1
Breakfast at Tiffany's|1961|Blake Edwards|Audrey Hepburn;George Peppard|2
Roman Holiday|1953|William Wyler|Audrey Hepburn;Gregory Peck|2
Ben-Hur|1959|William Wyler|Charlton Heston;Stephen Boyd|2
Some Like It Hot|1959|Billy Wilder|Marilyn Monroe;Tony Curtis;Jack Lemmon|2
Sunset Boulevard|1950|Billy Wilder|William Holden;Gloria Swanson|2
The Apartment|1960|Billy Wilder|Jack Lemmon;Shirley MacLaine|2
It's a Wonderful Life|1946|Frank Capra|James Stewart;Donna Reed|1
Citizen Kane|1941|Orson Welles|Orson Welles;Joseph Cotten|2
2001: A Space Odyssey|1968|Stanley Kubrick|Keir Dullea;Gary Lockwood|2
The Shining|1980|Stanley Kubrick|Jack Nicholson;Shelley Duvall|1
A Clockwork Orange|1971|Stanley Kubrick|Malcolm McDowell;Patrick Magee|2
Full Metal Jacket|1987|Stanley Kubrick|Matthew Modine;R. Lee Ermey|2
Dr. Strangelove|1964|Stanley Kubrick|Peter Sellers;George C. Scott|2
Chinatown|1974|Roman Polanski|Jack Nicholson;Faye Dunaway|2
One Flew Over the Cuckoo's Nest|1975|Miloš Forman|Jack Nicholson;Louise Fletcher|2
Annie Hall|1977|Woody Allen|Diane Keaton;Woody Allen|2
Lawrence of Arabia|1962|David Lean|Peter O'Toole;Omar Sharif|2
The Graduate|1967|Mike Nichols|Dustin Hoffman;Anne Bancroft|2
Rain Man|1988|Barry Levinson|Dustin Hoffman;Tom Cruise|1
Tootsie|1982|Sydney Pollack|Dustin Hoffman;Jessica Lange|2
Out of Africa|1985|Sydney Pollack|Meryl Streep;Robert Redford|2
When Harry Met Sally...|1989|Rob Reiner|Billy Crystal;Meg Ryan|1
The Princess Bride|1987|Rob Reiner|Cary Elwes;Robin Wright|1
Stand by Me|1986|Rob Reiner|Wil Wheaton;River Phoenix|2
Misery|1990|Rob Reiner|James Caan;Kathy Bates|2
A Few Good Men|1992|Rob Reiner|Tom Cruise;Jack Nicholson;Demi Moore|1
Sleepless in Seattle|1993|Nora Ephron|Tom Hanks;Meg Ryan|1
Fargo|1996|The Coen Brothers|Frances McDormand;William H. Macy|2
No Country for Old Men|2007|The Coen Brothers|Javier Bardem;Josh Brolin;Tommy Lee Jones|2
The Big Lebowski|1998|The Coen Brothers|Jeff Bridges;John Goodman|1
Amélie|2001|Jean-Pierre Jeunet|Audrey Tautou;Mathieu Kassovitz|2
Crouching Tiger, Hidden Dragon|2000|Ang Lee|Chow Yun-fat;Michelle Yeoh;Zhang Ziyi|2
Brokeback Mountain|2005|Ang Lee|Heath Ledger;Jake Gyllenhaal|2
Sense and Sensibility|1995|Ang Lee|Emma Thompson;Kate Winslet|2
Slumdog Millionaire|2008|Danny Boyle|Dev Patel;Freida Pinto|1
Trainspotting|1996|Danny Boyle|Ewan McGregor;Robert Carlyle|2
The Grand Budapest Hotel|2014|Wes Anderson|Ralph Fiennes;Tony Revolori|1
Moonlight|2016|Barry Jenkins|Trevante Rhodes;Mahershala Ali|2
Lost in Translation|2003|Sofia Coppola|Bill Murray;Scarlett Johansson|2
Groundhog Day|1993|Harold Ramis|Bill Murray;Andie MacDowell|1
Heat|1995|Michael Mann|Al Pacino;Robert De Niro|2
Scarface|1983|Brian De Palma|Al Pacino;Michelle Pfeiffer|1
The Untouchables|1987|Brian De Palma|Kevin Costner;Sean Connery|2
Mission: Impossible|1996|Brian De Palma|Tom Cruise;Jon Voight|1
The Truman Show|1998|Peter Weir|Jim Carrey;Laura Linney|1
Dead Poets Society|1989|Peter Weir|Robin Williams;Ethan Hawke|1
Eternal Sunshine of the Spotless Mind|2004|Michel Gondry|Jim Carrey;Kate Winslet|2
Silver Linings Playbook|2012|David O. Russell|Bradley Cooper;Jennifer Lawrence|1
The Hunger Games|2012|Gary Ross|Jennifer Lawrence;Josh Hutcherson|1
Black Swan|2010|Darren Aronofsky|Natalie Portman;Mila Kunis|1
Million Dollar Baby|2004|Clint Eastwood|Hilary Swank;Clint Eastwood|2
Unforgiven|1992|Clint Eastwood|Clint Eastwood;Gene Hackman|2
Jerry Maguire|1996|Cameron Crowe|Tom Cruise;Renée Zellweger|1
Almost Famous|2000|Cameron Crowe|Patrick Fugit;Kate Hudson|2
Bridesmaids|2011|Paul Feig|Kristen Wiig;Maya Rudolph|1
Superbad|2007|Greg Mottola|Jonah Hill;Michael Cera|1
Little Miss Sunshine|2006|Jonathan Dayton & Valerie Faris|Abigail Breslin;Steve Carell|2
Juno|2007|Jason Reitman|Elliot Page;Michael Cera|2
Gravity|2013|Alfonso Cuarón|Sandra Bullock;George Clooney|1
Speed|1994|Jan de Bont|Keanu Reeves;Sandra Bullock|1
Training Day|2001|Antoine Fuqua|Denzel Washington;Ethan Hawke|1
Glory|1989|Edward Zwick|Matthew Broderick;Denzel Washington;Morgan Freeman|2
Braveheart|1995|Mel Gibson|Mel Gibson;Sophie Marceau|1
Dances with Wolves|1990|Kevin Costner|Kevin Costner;Mary McDonnell|2
The Bodyguard|1992|Mick Jackson|Kevin Costner;Whitney Houston|1
Ghost|1990|Jerry Zucker|Patrick Swayze;Demi Moore|1
Men in Black|1997|Barry Sonnenfeld|Will Smith;Tommy Lee Jones|1
Independence Day|1996|Roland Emmerich|Will Smith;Jeff Goldblum|1
The Pursuit of Happyness|2006|Gabriele Muccino|Will Smith;Jaden Smith|2
Joker|2019|Todd Phillips|Joaquin Phoenix;Robert De Niro|1
The Hangover|2009|Todd Phillips|Bradley Cooper;Zach Galifianakis|1
A Star Is Born|2018|Bradley Cooper|Lady Gaga;Bradley Cooper|1
Knives Out|2019|Rian Johnson|Daniel Craig;Ana de Armas|1
Casino Royale|2006|Martin Campbell|Daniel Craig;Eva Green|1
GoldenEye|1995|Martin Campbell|Pierce Brosnan;Sean Bean|2
Goldfinger|1964|Guy Hamilton|Sean Connery;Honor Blackman|2
Skyfall|2012|Sam Mendes|Daniel Craig;Javier Bardem|1
American Beauty|1999|Sam Mendes|Kevin Spacey;Annette Bening|2
1917|2019|Sam Mendes|George MacKay;Dean-Charles Chapman|2
Beverly Hills Cop|1984|Martin Brest|Eddie Murphy;Judge Reinhold|1
Coming to America|1988|John Landis|Eddie Murphy;Arsenio Hall|1
The Blues Brothers|1980|John Landis|John Belushi;Dan Aykroyd|2
Airplane!|1980|Jim Abrahams, David & Jerry Zucker|Robert Hays;Julie Hagerty;Leslie Nielsen|2
Platoon|1986|Oliver Stone|Charlie Sheen;Tom Berenger;Willem Dafoe|2
Wall Street|1987|Oliver Stone|Michael Douglas;Charlie Sheen|2
The Exorcist|1973|William Friedkin|Ellen Burstyn;Linda Blair|2
Halloween|1978|John Carpenter|Jamie Lee Curtis;Donald Pleasence|2
Her|2013|Spike Jonze|Joaquin Phoenix;Scarlett Johansson|2
Do the Right Thing|1989|Spike Lee|Spike Lee;Danny Aiello|2
Boyhood|2014|Richard Linklater|Ellar Coltrane;Patricia Arquette|2
12 Years a Slave|2013|Steve McQueen|Chiwetel Ejiofor;Lupita Nyong'o|2
Nomadland|2020|Chloé Zhao|Frances McDormand;David Strathairn|2
The Shape of Water|2017|Guillermo del Toro|Sally Hawkins;Michael Shannon|2
Pan's Labyrinth|2006|Guillermo del Toro|Ivana Baquero;Sergi López|2
Poor Things|2023|Yorgos Lanthimos|Emma Stone;Mark Ruffalo|2
Anora|2024|Sean Baker|Mikey Madison;Mark Eydelshteyn|2
Wicked|2024|Jon M. Chu|Cynthia Erivo;Ariana Grande|1
Crazy Rich Asians|2018|Jon M. Chu|Constance Wu;Henry Golding|1
Spider-Man|2002|Sam Raimi|Tobey Maguire;Kirsten Dunst|1
Superman|1978|Richard Donner|Christopher Reeve;Margot Kidder|1
The Goonies|1985|Richard Donner|Sean Astin;Josh Brolin|1
Lethal Weapon|1987|Richard Donner|Mel Gibson;Danny Glover|1
Footloose|1984|Herbert Ross|Kevin Bacon;Lori Singer|2
Pride & Prejudice|2005|Joe Wright|Keira Knightley;Matthew Macfadyen|2
Notting Hill|1999|Roger Michell|Julia Roberts;Hugh Grant|1
Love Actually|2003|Richard Curtis|Hugh Grant;Emma Thompson|1
Four Weddings and a Funeral|1994|Mike Newell|Hugh Grant;Andie MacDowell|2
Bridget Jones's Diary|2001|Sharon Maguire|Renée Zellweger;Colin Firth|1
The King's Speech|2010|Tom Hooper|Colin Firth;Geoffrey Rush|2
Les Misérables|2012|Tom Hooper|Hugh Jackman;Anne Hathaway|2
Chicago|2002|Rob Marshall|Renée Zellweger;Catherine Zeta-Jones|2
Moulin Rouge!|2001|Baz Luhrmann|Nicole Kidman;Ewan McGregor|2
The Great Gatsby|2013|Baz Luhrmann|Leonardo DiCaprio;Carey Mulligan|1
Romeo + Juliet|1996|Baz Luhrmann|Leonardo DiCaprio;Claire Danes|2
Clueless|1995|Amy Heckerling|Alicia Silverstone;Paul Rudd|1
Fast Times at Ridgemont High|1982|Amy Heckerling|Sean Penn;Jennifer Jason Leigh|2
First Blood|1982|Ted Kotcheff|Sylvester Stallone;Brian Dennehy|2
Total Recall|1990|Paul Verhoeven|Arnold Schwarzenegger;Sharon Stone|2
Basic Instinct|1992|Paul Verhoeven|Michael Douglas;Sharon Stone|2
Fatal Attraction|1987|Adrian Lyne|Michael Douglas;Glenn Close|2
The Usual Suspects|1995|Bryan Singer|Kevin Spacey;Gabriel Byrne|2
X-Men|2000|Bryan Singer|Hugh Jackman;Patrick Stewart|1
Jojo Rabbit|2019|Taika Waititi|Roman Griffin Davis;Scarlett Johansson|2
Thor: Ragnarok|2017|Taika Waititi|Chris Hemsworth;Tom Hiddleston|1
Guardians of the Galaxy|2014|James Gunn|Chris Pratt;Zoe Saldaña|1
Jurassic World|2015|Colin Trevorrow|Chris Pratt;Bryce Dallas Howard|1
Apollo 13|1995|Ron Howard|Tom Hanks;Kevin Bacon|1
A Beautiful Mind|2001|Ron Howard|Russell Crowe;Jennifer Connelly|1
Splash|1984|Ron Howard|Tom Hanks;Daryl Hannah|2
Big|1988|Penny Marshall|Tom Hanks;Elizabeth Perkins|1
A League of Their Own|1992|Penny Marshall|Geena Davis;Tom Hanks|1
Anchorman: The Legend of Ron Burgundy|2004|Adam McKay|Will Ferrell;Christina Applegate|1
Napoleon Dynamite|2004|Jared Hess|Jon Heder;Efren Ramirez|2
Jumanji|1995|Joe Johnston|Robin Williams;Kirsten Dunst|1
The Revenant|2015|Alejandro G. Iñárritu|Leonardo DiCaprio;Tom Hardy|1
Birdman|2014|Alejandro G. Iñárritu|Michael Keaton;Edward Norton|2
Ray|2004|Taylor Hackford|Jamie Foxx;Kerry Washington|2
Walk the Line|2005|James Mangold|Joaquin Phoenix;Reese Witherspoon|2
Logan|2017|James Mangold|Hugh Jackman;Patrick Stewart|1
The Greatest Showman|2017|Michael Gracey|Hugh Jackman;Zac Efron|1
Mamma Mia!|2008|Phyllida Lloyd|Meryl Streep;Amanda Seyfried|1
Sophie's Choice|1982|Alan J. Pakula|Meryl Streep;Kevin Kline|2
All the President's Men|1976|Alan J. Pakula|Robert Redford;Dustin Hoffman|2
Kramer vs. Kramer|1979|Robert Benton|Dustin Hoffman;Meryl Streep|2
The Deer Hunter|1978|Michael Cimino|Robert De Niro;Christopher Walken;Meryl Streep|2
Butch Cassidy and the Sundance Kid|1969|George Roy Hill|Paul Newman;Robert Redford|2
The Sting|1973|George Roy Hill|Paul Newman;Robert Redford|2
Bonnie and Clyde|1967|Arthur Penn|Warren Beatty;Faye Dunaway|2
Network|1976|Sidney Lumet|Faye Dunaway;William Holden;Peter Finch|2
12 Angry Men|1957|Sidney Lumet|Henry Fonda;Lee J. Cobb|2
Dog Day Afternoon|1975|Sidney Lumet|Al Pacino;John Cazale|2
To Kill a Mockingbird|1962|Robert Mulligan|Gregory Peck;Mary Badham|2
Singin' in the Rain|1952|Gene Kelly & Stanley Donen|Gene Kelly;Debbie Reynolds|2
On the Waterfront|1954|Elia Kazan|Marlon Brando;Eva Marie Saint|2
A Streetcar Named Desire|1951|Elia Kazan|Vivien Leigh;Marlon Brando|2
Rebel Without a Cause|1955|Nicholas Ray|James Dean;Natalie Wood|2
The Good, the Bad and the Ugly|1966|Sergio Leone|Clint Eastwood;Eli Wallach;Lee Van Cleef|2
Patton|1970|Franklin J. Schaffner|George C. Scott;Karl Malden|2
Planet of the Apes|1968|Franklin J. Schaffner|Charlton Heston;Roddy McDowall|2
`;

const FILMS = RAW.trim().split('\n').map(line => {
  const [title, year, dir, cast, tier] = line.split('|');
  return {
    title: title.trim(),
    year: Number(year),
    dir: dir.trim(),
    cast: cast ? cast.split(';').map(s => s.trim()).filter(Boolean) : [],
    tier: Number(tier) || 1,
  };
});
