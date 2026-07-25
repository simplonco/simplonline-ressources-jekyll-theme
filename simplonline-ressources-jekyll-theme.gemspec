Gem::Specification.new do |spec|
  spec.name          = "simplonline-ressources-jekyll-theme"
  spec.version       = "0.1.0"
  spec.authors       = ["Wild Code School"]
  spec.summary       = "A Jekyll theme for Simplonline learning resources"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README)!i) }

  spec.add_runtime_dependency "jekyll", "~> 4.3"
  spec.add_runtime_dependency "jekyll-remote-theme"
  spec.add_runtime_dependency "jekyll-readme-index"
end
