package config

import (
	"github.com/kelseyhightower/envconfig"
	"log"
)

type Config struct {
	SubId       string `envconfig:"SUBSCRIPTION_ID"`
	ProjectId   string `envconfig:"PROJECT_ID"`
	Credentials string `envconfig:"GOOGLE_CREDENTIALS_JSON"`
}

func ReadConfig() Config {
	var c Config
	err := envconfig.Process("", &c)
	if err != nil {
		log.Fatal(err.Error())
	}

	if err != nil {
		log.Fatal(err.Error())
	}

	return c
}
