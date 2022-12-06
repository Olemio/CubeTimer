<?php
include 'php/connection_info.php';

//Opprette kobling
$kobling = new mysqli($tjener, $brukernavn, $passord, $database);

//Sjekk om kobling virker
if ($kobling->connect_error) {
    die("Noe gikk galt: " . $kobling->connect_error);
}

//Angi UTF-8 som tegnsett
$kobling->set_charset("utf8");

$sql = "SELECT * FROM high_score ORDER BY score DESC LIMIT 10";

$resultat = $kobling->query($sql);

if (!$resultat) {
    echo "Noe gikk galt med spørringen $sql ($kobling->error).";
} else {
    echo '<table><tr><th>Navn</th><th>Score</th></tr>';
    
    while ($rad = $resultat->fetch_assoc()) {
        $navn = $rad["name"];
        $score = $rad["score"];
        echo '<tr><td>' . $navn . '</td><td>' . $score . '</td></tr>';
    }
    echo '</table>';
}
?>

