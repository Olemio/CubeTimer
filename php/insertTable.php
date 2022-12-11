  <!-- Insert times to database -->
<link rel="stylesheet" href="css/style.css">
    
<form method="POST" name="saveTime">
    <input type="hidden" name="score" value="">
    <input type="submit" name="save" id="submit" value="Lagre score">
</form>

<?php 
include 'php/connection_info.php';

    echo "Before func"; 
    echo $_POST["score"]; 
    echo "Before func"; 
    if (isset($_POST["score"])) {

        //Opprette kobling
        $kobling = new mysqli($tjener, $brukernavn, $passord, $database);
    
        //Sjekk om kobling virker
        if ($kobling->connect_error) {
            die("Noe gikk galt: " . $kobling->connect_error);
        }
    
        //Angi UTF-8 som tegnsett
        $kobling->set_charset("utf8");
    
        //Lagrer feltene i variable
        $score = $_POST["score"];

        $sql = "INSERT INTO times(time) VALUES ('$score')"; 
        
        
    
        if ($kobling->query($sql)) {
        } else {
            echo "Noe gikk galt med spørringen $sql ($kobling->error).";
        }
    }
    
?>