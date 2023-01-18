#[derive(Debug)]
pub struct ConnectionString {
    pub username: String,
    pub password: String,
    pub cluster: String,
}

impl ConnectionString {
    pub fn build_connection_string(&self) -> String {
        return format!("mongodb://{}:{}@{}-shard-00-00.rxog4.mongodb.net:27017,cluster0-shard-00-01.rxog4.mongodb.net:27017,cluster0-shard-00-02.rxog4.mongodb.net:27017/?ssl=true&replicaSet=atlas-apd9wg-shard-0&authSource=admin&retryWrites=true&w=majority",
        &self.username, &self.password, &self.cluster)
    }
}
